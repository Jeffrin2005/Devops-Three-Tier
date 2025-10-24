import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import AttendanceSidebar from "./AttendanceSidebar";

const AttendanceReport = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const fetchReport = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/attendance?date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        let sno = 1;
        const rows = data.records.map((rec) => ({
          sno: sno++,
          name: rec.employee.userID?.name,
          empId: rec.employee.employeeID,
          department: rec.employee.department?.dep_name,
          status: rec.status,
        }));
        setRecords(rows);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, [date]);

  const statusConfig = {
    present: { label: "Present", color: "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 border border-emerald-300" },
    absent: { label: "Absent", color: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300" },
    sick: { label: "Sick", color: "bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border border-amber-300" },
    leave: { label: "Leave", color: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300" },
  };

  const columns = [
    { name: "S No", selector: (row) => row.sno, width: "70px" },
    { name: "Name", selector: (row) => row.name },
    { name: "Emp ID", selector: (row) => row.empId },
    { name: "Department", selector: (row) => row.department },
    {
      name: "Status",
      cell: (row) => {
        const config = statusConfig[row.status];
        return config ? (
          <span className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-sm ${config.color}`}>
            {config.label}
          </span>
        ) : (
          <span className="text-slate-500 font-medium">-</span>
        );
      },
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-xl">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Attendance Report</h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="border border-slate-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              <Link 
                to="/admin-dashboard/attendance"
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">📝</span>
                <span className="font-semibold">Take Attendance</span>
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
      </div>
      
      {/* Sidebar */}
      <AttendanceSidebar selectedDate={date} onDateChange={setDate} />
    </div>
  );
};

export default AttendanceReport;
