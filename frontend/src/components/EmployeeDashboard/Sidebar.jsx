import React from 'react'  
import { NavLink } from 'react-router-dom'
import { FaBuilding,FaUsers, FaTachometerAlt ,FaCogs,
    FaMoneyBillWave,FaCalendarAlt,
 } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const Sidebar = () => {
    const {user} = useAuth()                                
    return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-lg flex flex-col space-y-2">
           <div>
            <h3 className="text-2xl font-semibold tracking-wide text-white text-center inline-block bg-teal-600 px-4 py-2 rounded">Employee Management</h3>
           </div>
        <div>
            <NavLink to="/employee-dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700"
            >
                <FaTachometerAlt className="text-xl"/>
                <span>Dashboard</span>

            </NavLink>
            <NavLink 
            to={`/employee-dashboard/profile/${user._id}`}
             className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
                <FaUsers className="text-xl"/>
                <span>My Profile</span>
            </NavLink>
            <NavLink 
            to={`/employee-dashboard/leaves/${user._id}`} 
            className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
                <FaBuilding className="text-xl"/>
                <span>Leaves</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/salary/${user._id}`} className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
                <FaCalendarAlt className="text-xl"/>
                <span>Salary</span>
            </NavLink>
            <NavLink to="/employee-dashboard/setting" className="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-gray-700">
                <FaCogs className="text-xl"/>
                <span>Setting</span>
            </NavLink>
        </div>
    </div>
    )
}

export default Sidebar
