import React, { useState } from 'react';
import { FaCheckCircle, FaHourglassHalf, FaUsers, FaFileAlt, FaTimesCircle, FaMoneyBillWave } from 'react-icons/fa';
import SummaryCard from './SummaryCard';
import { FaBuilding } from 'react-icons/fa';
import axios from 'axios';
import { useEffect } from 'react';

const AdminSummary = () => {
  const [summary ,setSummary] = useState(null)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get('http://localhost:5000/api/dashboard/summary',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummary(summary.data)
      } catch(error){
        if(error.response){
            alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
    fetchSummary()
  },[])
  if(!summary){
    return <div>Loading...</div>
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome to your HR Management System</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SummaryCard icon={<FaUsers className="text-2xl" />}
         text="Total Employees" number={summary.totalEmployees} bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600" />
        <SummaryCard icon={<FaBuilding className="text-2xl" />}
         text="Total Departments" number={summary.totalDepartments} bgColor="bg-gradient-to-r from-amber-500 to-amber-600" />
        <SummaryCard icon={<FaMoneyBillWave className="text-2xl" />} 
        text="Monthly Salary" number={summary.totalSalaries} bgColor="bg-gradient-to-r from-indigo-500 to-indigo-600" />
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
        <h4 className='text-2xl font-bold text-slate-800 mb-6 flex items-center space-x-3'>
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
            📋
          </span>
          Leave Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard icon={<FaFileAlt className="text-2xl" />} text="Leave Applied"
              number={summary.leaveSummary.appliedFor} bgColor="bg-gradient-to-r from-blue-500 to-blue-600" />
            <SummaryCard icon={<FaCheckCircle className="text-2xl" />}
             text="Leave Approved"
              number={summary.leaveSummary.approved} bgColor="bg-gradient-to-r from-emerald-500 to-emerald-600" />
            <SummaryCard icon={<FaHourglassHalf className="text-2xl" />}
             text="Leave Pending" number={summary.leaveSummary.pending} bgColor="bg-gradient-to-r from-amber-500 to-amber-600" />
            <SummaryCard icon={<FaTimesCircle className="text-2xl" />}
             text="Leave Rejected" number={summary.leaveSummary.rejected} bgColor="bg-gradient-to-r from-red-500 to-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;