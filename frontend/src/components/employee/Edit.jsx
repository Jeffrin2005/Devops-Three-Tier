import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Edit = () => {
    const [employee ,setEmployee] = useState({
        name:"",
        maritalStatus:"",
        designation:"",
        salary:0,
        department:"",
    })
    const [departments ,setDepartments] = useState([])

  
    const navigate = useNavigate()  
    const {id} = useParams()

     useEffect(() =>{
            const getDepartments = async () => {
                const departments = await fetchDepartments()
                setDepartments(departments)
            }
           getDepartments();
        },[]);

    useEffect(() =>{
        const fetchEmployee = async () => {
       
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/employee/${id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                    const employee = response.data.employee
                 setEmployee((prev) => ({
                    ...prev,
                    name:employee.userID ? employee.userID.name : "",
                    maritalStatus:employee.maritalStatus,
                    designation:employee.designation,
                    salary:employee.salary,
                    department:employee.department
                }))
                }
            } catch (error) {
               if(error.response && !error.response.data.success){
                console.error("Fetch department error:", error.response.data.error);
               }
            } 
        };
        fetchEmployee();
    },[]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevData) => ({...prevData,[name]: value}))
    };
    const   handleSubmit = async (e) => {
        e.preventDefault()

        

        try {
            const response = await axios.put(
                `http://localhost:5000/api/employee/${id}`,
                employee,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }   
             })
             if(response.data.success){
                alert(response.data.message)
                navigate("/admin-dashboard/employees")
             }

        } catch (error) {
            if (error.response) {
                const { message, error: errorMsg } = error.response.data;
                alert(message || errorMsg || "Something went wrong. Please try again.");
            }
        }
    };

    return (
    <>{departments.length > 0 ?(
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>

        <form onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
        

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              value={employee.maritalStatus}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-gray-700">Designation</label>
            <input
              type="text"

              name="designation"
              onChange={handleChange}
              value={employee.designation}
              placeholder="Enter designation"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          {/* Salary */}
          <div>
            <label className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              value={employee.salary}
              placeholder="Enter salary"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           {/* Department */}
           <div className="col-span-2">
            <label className="block text-gray-700">Department</label>
            <select
              name="department"
              onChange={handleChange}
              value={employee.department}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select department</option>
              {departments.map(dep => 
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              )}
            </select>
          </div>
      
          {/* Add Employee button centered below the form */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>): <div>Loading...</div>}
    </>
  );
};

export default Edit;
