import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddDepartment = () => {
    const [department , setDepartment] = useState({
        dep_name: "",
        description: ""
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const {name , value} = e.target;
        setDepartment({...department , [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            const response = await 
             axios.post('http://localhost:5000/api/department/add',department,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }   
             })
             if(response.data.success){
                alert(response.data.message)
                navigate("/admin-dashboard/departments")
             }

        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
           <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Add Department</h2>
              <p className="text-slate-600 font-medium">Create a new organizational department</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="dep_name" className="block text-slate-700 font-semibold mb-2">Department Name</label>
                    <input
                        type="text"
                        id="dep_name" name="dep_name"
                        onChange={handleChange}
                        placeholder="Enter department name"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-slate-700 font-semibold mb-2">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleChange}
                        rows="4"
                        placeholder="Enter department description"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                    >
                        <span>🏢</span>
                        <span>Add Department</span>
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default AddDepartment