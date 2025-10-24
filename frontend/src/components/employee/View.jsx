import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

// Reusable item for profile fields
const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</span>
    <span className="text-lg font-semibold text-slate-800 break-words">{value}</span>
  </div>
);
const View = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)
    useEffect(() => { 
        const fetchEmployee = async () => {
       
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/employee/${id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                 setEmployee(response.data.employee)
                }
            } catch (error) {
               if(error.response && !error.response.data.success){
                console.error("Fetch department error:", error.response.data.error);
               }
            } 
        };
        fetchEmployee();
    },[]); 
    
    return (
        <>
        {employee ? (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 w-full max-w-5xl">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-10">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 rounded-xl text-white">
                  <span className="text-3xl">👤</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-800">My Profile</h1>
                  <p className="text-slate-600 font-medium">Personal information overview</p>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                {/* Avatar */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={`http://localhost:5000/${employee.userID?.profileImage}`}
                    alt="Profile"
                    className="rounded-full border-4 border-cyan-500 w-56 h-56 object-cover shadow-md"
                  />
                </div>

                {/* Details */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <ProfileItem label="Name" value={employee.userID?.name} />
                  <ProfileItem label="Employee ID" value={employee.employeeID} />
                  <ProfileItem label="Date of Birth" value={new Date(employee.dob).toLocaleDateString()} />
                  <ProfileItem label="Gender" value={employee.gender} />
                  <ProfileItem label="Department" value={employee.department?.dep_name} />
                  <ProfileItem label="Marital Status" value={employee.maritalStatus} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        )}
        </>
    );
}

export default View;