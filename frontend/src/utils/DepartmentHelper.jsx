import { useNavigate } from "react-router-dom"
import axios from "axios"
export const columns = [
    {
        name:"S No",
        selector:(row) => row.sno
    },
    {
        name:"Department Name",
        selector:(row) => row.dep_name,
        sortable:true
    },
    {
        name:"Action",
        selector:(row) => row.action
    },  
]

export const DepartmentButtons = ({ Id , onDepartmentDelete }) => {
    const navigate = useNavigate();
    const handleDelete  = async () => {
        const confirm = window.confirm("Are you sure you want to delete this department?")
        if(!confirm){
            return
        } 
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/department/${Id}`,
                {
                    headers:{
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.data.success){
               onDepartmentDelete()
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
            >
              Edit
            </button>
        <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={handleDelete}>
        delete</button>
        </div>
    )
}
