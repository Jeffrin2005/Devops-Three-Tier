import React from 'react'  
import { NavLink } from 'react-router-dom'
import { FaBuilding,FaUsers, FaTachometerAlt ,FaCogs,
    FaMoneyBillWave,FaCalendarAlt,
 } from 'react-icons/fa'

const AdminSidebar = () => {
    return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-2xl flex flex-col space-y-1">
           <div className="p-4 border-b border-slate-700">
            <h3 className="text-xl font-bold tracking-wide text-white text-center bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 rounded-lg shadow-lg">Employee Management</h3>
           </div>
        <div className="px-3 py-2 space-y-1">
            <NavLink to="/admin-dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group"
            >
                <FaTachometerAlt className="text-lg text-blue-400 group-hover:text-blue-300 transition-colors"/>
                <span className="font-medium">Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard/employees"
             className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaUsers className="text-lg text-emerald-400 group-hover:text-emerald-300 transition-colors"/>
                <span className="font-medium">Employee</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaBuilding className="text-lg text-purple-400 group-hover:text-purple-300 transition-colors"/>
                <span className="font-medium">Department</span>
            </NavLink>
            <NavLink to="/admin-dashboard/attendance" className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaCalendarAlt className="text-lg text-orange-400 group-hover:text-orange-300 transition-colors"/>
                <span className="font-medium">Take Attendance</span>
            </NavLink>
            <NavLink to="/admin-dashboard/attendance/report" className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group ml-4 bg-slate-800/50">
                <FaCalendarAlt className="text-lg text-amber-400 group-hover:text-amber-300 transition-colors"/>
                <span className="font-medium text-sm">Attendance Report</span>
            </NavLink>
            <NavLink to="/admin-dashboard/leaves" className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaCalendarAlt className="text-lg text-cyan-400 group-hover:text-cyan-300 transition-colors"/>
                <span className="font-medium">Leaves</span>
            </NavLink>
            <NavLink to="/admin-dashboard/salary/add" className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaMoneyBillWave className="text-lg text-green-400 group-hover:text-green-300 transition-colors"/>
                <span className="font-medium">Salary</span>
            </NavLink>
            <NavLink 
            to="/admin-dashboard/setting"
             className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-700 hover:shadow-md group">
                <FaCogs className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors"/>
                <span className="font-medium">Setting</span>
            </NavLink>
        </div>
    </div>
    )
}

export default AdminSidebar
