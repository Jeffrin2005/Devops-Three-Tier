import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployees } from "../../utils/EmployeeHelper";
const Add = () => {
    const [salary ,setSalary] = useState({
        employeeId:null,
        basicSalary:0,
        allowances:0,
        deductions:0,
        payDate:null,
    })
    const [departments ,setDepartments] = useState([])
    const [employees ,setEmployees] = useState([])
    const navigate = useNavigate()  


     useEffect(() =>{
            const getDepartments = async () => {
                const departments = await fetchDepartments()
                setDepartments(departments)
            }
           getDepartments();
        },[]);

        const handleDepartment = async (e) => {
            const emps = await getEmployees(e.target.value)
            setEmployees(emps)
        }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((prevData) => ({...prevData,[name]: value}))
    };
    const   handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(
                `http://localhost:5000/api/salary/add`,
                salary,{
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
    <>{departments ? (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">💰</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Add Salary</h1>
          <p className="text-slate-600 font-medium">Configure employee salary details</p>
        </div>

        <form onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Department */}
            <div>
            <label className="block text-slate-700 font-semibold mb-2">Department</label>
            <select
              name="department"
              onChange={handleDepartment} 
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200">
              <option value="">Select department</option>
              {departments.map(dep => 
                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
              )}
            </select>
          </div>
   {/* employee */}
   <div>
            <label className="block text-slate-700 font-semibold mb-2">Employee</label>
            <select
              name="employeeId"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200">
              <option value="">Select Employee</option>
              {employees.map(emp => (
                <option key={emp._id} value={emp._id}>
                    {emp.employeeID}
                </option>
              ))}
            </select>
          </div>
         
        

       

          {/* Basic Salary */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              onChange={handleChange}
              placeholder="Enter basic salary amount"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Allowances
            </label>
            <input
              type="number"
              name="allowances"
              onChange={handleChange}
              placeholder="Enter allowances amount"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>  
          
          {/* Deductions */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Deductions
            </label>
            <input
              type="number"
              name="deductions"
              onChange={handleChange}
              placeholder="Enter deductions amount"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>
          
          {/* Pay Date */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Pay Date
            </label>
            <input
              type="date"
              name="payDate"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            />
          </div>

          {/* Add Salary button centered below the form */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>💰</span>
              <span>Add Salary</span>
            </button>
          </div>
        </form>
      </div>
    </div>): <div>Loading...</div>}
    </>
  );
};

export default Add;
