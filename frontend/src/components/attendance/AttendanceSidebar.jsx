import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const AttendanceSidebar = ({ selectedDate, onDateChange }) => {
  const [attendanceData, setAttendanceData] = useState({
    present: [],
    absent: [],
    sick: [],
    leave: [],
    total: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchAttendanceData = async (date) => {
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
        // Group employees by status
        const grouped = {
          present: [],
          absent: [],
          sick: [],
          leave: [],
          total: data.records.length
        };

        data.records.forEach(record => {
          const employee = {
            id: record.employee._id,
            name: record.employee.userID?.name,
            empId: record.employee.employeeID,
            department: record.employee.department?.dep_name,
            status: record.status
          };
          
          if (grouped[record.status]) {
            grouped[record.status].push(employee);
          }
        });

        setAttendanceData(grouped);
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchAttendanceData(selectedDate);
    }
  }, [selectedDate]);

  const statusConfig = {
    present: { label: "Present", color: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg", icon: "✓" },
    absent: { label: "Absent", color: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg", icon: "✗" },
    sick: { label: "Sick", color: "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg", icon: "🏥" },
    leave: { label: "Leave", color: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg", icon: "📅" }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format("MMM DD, YYYY");
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-50 to-white border-l border-slate-200 p-3 h-full overflow-y-auto shadow-xl">
      <div className="mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white">
        <h3 className="text-lg font-bold mb-1">Daily Attendance Report</h3>
        <p className="text-sm text-blue-100">{formatDate(selectedDate)}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-2xl font-bold text-slate-800">{attendanceData.total}</div>
              <div className="text-xs text-slate-600 font-medium">Total Employees</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <div className="text-2xl font-bold text-emerald-700">{attendanceData.present.length}</div>
              <div className="text-xs text-emerald-600 font-medium">Present</div>
            </div>
          </div>

          {/* Status Breakdown */}
          {Object.entries(statusConfig).map(([status, config]) => {
            const employees = attendanceData[status] || [];
            return (
              <div key={status} className="mb-6">
                <div className={`flex items-center justify-between p-4 rounded-xl ${config.color} mb-4 shadow-md`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{config.icon}</span>
                    <span className="font-semibold">{config.label}</span>
                  </div>
                  <span className="text-xl font-bold bg-white/20 px-3 py-1 rounded-full">{employees.length}</span>
                </div>

                {/* Employee List */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {employees.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No employees</p>
                  ) : (
                    employees.map((employee) => (
                      <div
                        key={employee.id}
                        className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200 hover:from-slate-100 hover:to-slate-200 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-sm text-slate-800">
                              {employee.name}
                            </div>
                            <div className="text-xs text-slate-600 font-medium">
                              ID: {employee.empId}
                            </div>
                            <div className="text-xs text-slate-500">
                              {employee.department}
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
                            {config.label}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Quick Stats</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-emerald-100 p-3 rounded-lg border border-emerald-200">
                <span className="text-slate-700 font-medium">Attendance Rate:</span>
                <span className="font-bold text-emerald-700">
                  {attendanceData.total > 0 
                    ? Math.round((attendanceData.present.length / attendanceData.total) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-red-100 p-3 rounded-lg border border-red-200">
                <span className="text-slate-700 font-medium">Absent Rate:</span>
                <span className="font-bold text-red-700">
                  {attendanceData.total > 0 
                    ? Math.round((attendanceData.absent.length / attendanceData.total) * 100)
                    : 0}%
                </span>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                <span className="text-slate-700 font-medium">On Leave:</span>
                <span className="font-bold text-blue-700">{attendanceData.leave.length}</span>
              </div>
              <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg border border-amber-200">
                <span className="text-slate-700 font-medium">Sick:</span>
                <span className="font-bold text-amber-700">{attendanceData.sick.length}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceSidebar;
