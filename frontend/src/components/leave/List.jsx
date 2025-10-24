import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
const List = () => {
    const {user} = useAuth()
    const [leaves, setLeaves] = useState(null)
    let sno = 1;
    const {id} = useParams()

    const fetchLeaves = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.data.success) {
            setLeaves(response.data.leaves);
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.message);
          }
        }
      };
    
      useEffect(() => {
        fetchLeaves();
      }, []);

    return (
        <>
        {leaves ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3 rounded-xl">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">My Leave Requests</h3>
                  <p className="text-slate-600 font-medium">Track and manage your leave applications</p>
                </div>
              </div>
              {user.role === "employee" && (
                <Link
                  to="/employee-dashboard/add-leave"
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl whitespace-nowrap transition-all duration-200"
                >
                  ➕ New Leave
                </Link>
              )}
            </div>

            {/* Search */}
            <div className="flex items-center justify-between mb-8 w-full">
              <input
                type="text"
                placeholder="Search by leave type, status…"
                className="w-full max-w-md border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700"
              />
            </div>

            {leaves.length > 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-sm">
                <table className="w-full text-sm text-left text-slate-700">
                  <thead className="text-xs uppercase bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">S No</th>
                      <th className="px-6 py-4">Leave Type</th>
                      <th className="px-6 py-4">From</th>
                      <th className="px-6 py-4">To</th>
                      <th className="px-6 py-4">Description</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave._id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">{sno++}</td>
                        <td className="px-6 py-4">{leave.leaveType}</td>
                        <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{leave.reason}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leave.status === "Approved" ? "bg-emerald-100 text-emerald-700" :
                            leave.status === "Rejected" ? "bg-red-100 text-red-700" :
                            "bg-amber-100 text-amber-700"}
                          `}>
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>No leave records found.</p>
              </div>
            )}
          </div>
        </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        )}
        </>
    );
};

export default List;
