import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const TakeAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingRows, setEditingRows] = useState(new Set());
  const today = dayjs().format("YYYY-MM-DD");

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/attendance?date=${today}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data.success) {
        // Map to {employee:{..},status}
        const map = new Map();
        data.records.forEach((rec) => {
          map.set(rec.employee._id, rec.status);
        });
        buildRows(map);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching attendance");
    } finally {
      setLoading(false);
    }
  };

  const buildRows = async (statusMap) => {
    try {
      // fetch employees
      const { data } = await axios.get("http://localhost:5000/api/employee", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (data.success) {
        let sno = 1;
        const rows = data.employees.map((emp) => ({
          _id: emp._id,
          sno: sno++,
          name: emp.userID?.name,
          empId: emp.employeeID,
          department: emp.department?.dep_name,
          status: statusMap.get(emp._id) || "",
        }));
        setRecords(rows);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line
  }, []);

  const toggleEdit = (rowId) => {
    setEditingRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleMark = async (row, status) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/attendance",
        {
          employeeId: row._id,
          status,
          date: today,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setRecords((prev) =>
          prev.map((r) =>
            r._id === row._id ? { ...r, status: data.attendance.status } : r
          )
        );
        // Close edit mode after successful update
        setEditingRows(prev => {
          const newSet = new Set(prev);
          newSet.delete(row._id);
          return newSet;
        });
      }
    } catch (err) {
      console.error(err);
      alert("Error marking attendance");
    }
  };

  const columns = [
    { name: "S No", selector: (row) => row.sno, width: "70px" },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Emp ID", selector: (row) => row.empId },
    { name: "Department", selector: (row) => row.department },
    {
      name: "Action",
      cell: (row) => {
        const isEditing = editingRows.has(row._id);
        const statusConfig = {
          present: { label: "Present", color: "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg" },
          absent: { label: "Absent", color: "bg-gradient-to-r from-red-500 to-red-600 shadow-lg" },
          sick: { label: "Sick", color: "bg-gradient-to-r from-amber-500 to-amber-600 shadow-lg" },
          leave: { label: "Leave", color: "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg" },
        };

        return (
          <div className="space-y-2">
            {/* Show status badge with Edit button when status exists and not editing */}
            {row.status && !isEditing && (
              <div className="flex items-center space-x-2">
                <span
                  className={`${statusConfig[row.status]?.color} text-white px-3 py-1 rounded text-xs inline-block`}
                >
                  {statusConfig[row.status]?.label}
                </span>
                <button
                  onClick={() => toggleEdit(row._id)}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
              </div>
            )}
            
            {/* Show all buttons when in edit mode */}
            {isEditing && (
              <div className="space-y-2">
                <div className="text-xs text-slate-600 font-semibold mb-2">Change status:</div>
                <div className="space-x-2 mb-3">
                  {[
                    { label: "Present", value: "present", color: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
                    { label: "Absent", value: "absent", color: "bg-gradient-to-r from-red-500 to-red-600" },
                    { label: "Sick", value: "sick", color: "bg-gradient-to-r from-amber-500 to-amber-600" },
                    { label: "Leave", value: "leave", color: "bg-gradient-to-r from-blue-500 to-blue-600" },
                  ].map((btn) => (
                    <button
                      key={btn.value}
                      className={`${btn.color} text-white px-3 py-1 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200`}
                      onClick={() => handleMark(row, btn.value)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => toggleEdit(row._id)}
                  className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Show all buttons when no status is set */}
            {!row.status && (
              <div className="space-x-2">
                {[
                  { label: "Present", value: "present", color: "bg-gradient-to-r from-emerald-500 to-emerald-600" },
                  { label: "Absent", value: "absent", color: "bg-gradient-to-r from-red-500 to-red-600" },
                  { label: "Sick", value: "sick", color: "bg-gradient-to-r from-amber-500 to-amber-600" },
                  { label: "Leave", value: "leave", color: "bg-gradient-to-r from-blue-500 to-blue-600" },
                ].map((btn) => (
                  <button
                    key={btn.value}
                    className={`${btn.color} text-white px-3 py-1 rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-200`}
                    onClick={() => handleMark(row, btn.value)}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Take Attendance</h2>
              <p className="text-slate-600 font-medium">{today}</p>
            </div>
          </div>
          <Link 
            to="/admin-dashboard/attendance/report"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span className="text-lg">📊</span>
            <span className="font-semibold">View Report</span>
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <DataTable
            columns={columns}
            data={records}
            progressPending={loading}
            pagination
            highlightOnHover
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: '#f8fafc',
                  borderBottom: '2px solid #e2e8f0',
                },
              },
              headCells: {
                style: {
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#475569',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                },
              },
              cells: {
                style: {
                  fontSize: '14px',
                  color: '#334155',
                },
              },
              rows: {
                style: {
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;
