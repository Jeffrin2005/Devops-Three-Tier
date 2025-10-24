import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Add = () => {
    const [departments ,setDepartments] = useState([])
    const [formData, setFormData]  = useState({})
    const navigate = useNavigate()  

    useEffect(() =>{
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
       getDepartments();
    },[]);

    const handleChange = (e) => {
        const { name, value , files} = e.target;
        if(name === "image"){
            setFormData((prevData) => ({...prevData,[name]:files[0]}))
        }else{
            setFormData((prevData) => ({...prevData,[name]: value}))
        }
    };
    const   handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach(key => {
            formDataObj.append(key, formData[key])
        })

        try { 
            const response = await 
             axios.post('http://localhost:5000/api/employee/add',
                formDataObj,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }   
             })
             if(response.data.success){
                alert(response.data.message)
                navigate("/admin-dashboard/employees")
             }

        } catch(error){
            if (error.response) {
                const { message, error: errorMsg } = error.response.data;
                alert(message || errorMsg || "Something went wrong. Please try again.");
            }
        }
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add New Employee</h1>
          <p className="text-slate-600 font-medium">Fill in the details to add a new employee</p>
        </div>

        <form 
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter full name"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Employee ID</label>
            <input
              type="text"
              name="employeeID"
              onChange={handleChange}
              placeholder="Enter employee ID"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Enter job designation"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Department</label>
            <select
              name="department"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
              <option value="">Select department</option>
              {departments.map(dep => 
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              )}
            </select>
          </div>

          {/* Salary */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Enter salary amount"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Role</label>
            <select 
            name="role"
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
            />
          </div>
          {/* Add Employee button centered below the form */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>➕</span>
              <span>Add Employee</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
