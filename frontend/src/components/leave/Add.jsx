import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

const Add = () => {
    const {user} = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id, // keep for backward compatibility
        userID: user._id,
    });

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const payload = { ...leave, userId: user._id };
     const response = await axios.post('http://localhost:5000/api/leave/add', 
        payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(response.data.success){
        navigate('/employee-dashboard/leaves')
      }
    } 
    
    catch (error) {
      if (error.response && !error.response.data.success) {
        const errorMsg = error.response.data.error || error.response.data.message || "Unexpected error occurred";
        alert(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Request for Leave</h1>
          <p className="text-slate-600 font-medium">Submit your leave application</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Leave Type */}
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-2">Leave Type</label>
            <select
              name="leaveType"
              value={leave.leaveType || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              required
            >
              <option value="">Select leave type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">From Date</label>
            <input
              type="date"
              name="startDate"
              value={leave.startDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              required
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">To Date</label>
            <input
              type="date"
              name="endDate"
              value={leave.endDate || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-2">Description</label>
            <textarea
              name="reason"
              value={leave.reason || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Enter reason for leave"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>📅</span>
              <span>Submit Leave Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;