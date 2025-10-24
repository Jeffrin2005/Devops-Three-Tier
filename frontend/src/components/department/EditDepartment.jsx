
import React, { useState, useEffect } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const {id} = useParams()
    const [department , setDepartment] = useState([])
    const [depLoading , setDepLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => { 
        const fetchDepartments = async () => {
            setDepLoading(true)
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/department/${id}`,{
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if(response.data.success){
                 setDepartment(response.data.department)
                }
            } catch (error) {
               if(error.response && !error.response.data.success){
                console.error("Fetch department error:", error.response.data.error);
               }
            } finally {
                setDepLoading(false)
            }
        };
        fetchDepartments();
    },[id]); 
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setDepartment({...department , [name]: value})
    }

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try { 
            const response = await 
             axios.put(
                `http://localhost:5000/api/department/${id}`,
                department,{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }   
             })
             if(response.data.success){
                // Successfully updated, redirect to departments list
                navigate("/admin-dashboard/departments");
             }

        } catch(error){
            if(error.response && !error.response.data.success){
                console.error("Update department error:", error.response.data.error);
            }
        }
    }
    return (
        <>{depLoading ? <div>Loading ... </div> : 
        <div>
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
         <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Edit Department</h2>
         <form onSubmit={handleSubmit}
          className="space-y-5">
             <div>
                 <label htmlFor="dep_name" className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
                 <input
                     type="text"
                     id="dep_name" name="dep_name"
                     onChange={handleChange}
                     value={department.dep_name}
                     placeholder="Enter Department Name"
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                 />
             </div>
             <div>
                 <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                 <textarea
                     name="description"
                     id="description"
                     onChange={handleChange}
                     value={department.description} 
                     rows="4"
                     placeholder="Description"
                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                 />
             </div>
             <div className="text-center">
                 <button
                     type="submit"
                     className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow"
                 >
                     Edit Department
                 </button>
             </div>
         </form>
         </div>
     </div>
}</>
    )
}
export default EditDepartment