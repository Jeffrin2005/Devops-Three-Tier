import axios from "axios";
import { useNavigate } from "react-router-dom";                 
export const columns = [
    {
        name:"S No",
        selector:(row) => row.sno,
        width:"70px"
    },
    {
        name:"Name",
        selector:(row) => row.name,
        sortable:true,
        width:"130px"
    },
    {
        name:"Image",
        selector:(row) => row.profileImage,
        width:"90px"
    },
    {
        name:"Department",
        selector:(row) => row.dep_name,
        width:"120px"
    },
    {
        name:"DOB",
        selector:(row) => row.dob,
        sortable:true,
        width:"130px"
    },
    {
        name:"Action",
        selector:(row) => row.action,
    },  
]

export const fetchDepartments = async () => {
    let departments ; 
    try {
        const response = await axios.get('http://localhost:5000/api/department',{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
            departments = response.data.departments
        }
    } catch (error) {
       if(error.response && !error.response.data.success){
        alert(error.response.data.error)
       }
    }
    return departments || []
};
// employee for salary form

export const getEmployees = async (id) => {
    let employees ; 
    try {
        const response = await axios.
        get(`http://localhost:5000/api/employee/department/${id}`,{
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        if(response.data.success){
            employees = response.data.employees
        }
    } catch (error) {
       if(error.response && !error.response.data.success){
        alert(error.response.data.error)
       }
    }
    return employees || []
};

export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate();
    

    return (
        <div className="flex gap-2">
            <button
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
            >
              👁️ View
            </button>
        <button
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
        >
        ✏️ Edit</button>
        <button
        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>
        💰 Salary</button>
        <button
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>
        📅 Leave</button>
        </div>
    )
}
