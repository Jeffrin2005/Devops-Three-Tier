import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';

const DepartmentList = () => {
    const [departments , setDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const [filteredDepartments , setFilteredDepartments] = useState([])
    const onDepartmentDelete =  () => {
        fetchDepartments()
    }

    const fetchDepartments = async () => {
        setDepLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/department',{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success){
                let sno = 1; 
                const data = await response.data.departments.map((dep) => (
                    {
                        _id: dep._id,
                        sno: sno++,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons Id={dep._id}
                        onDepartmentDelete={onDepartmentDelete} />,
                    })); 
                setDepartments(data);
                setFilteredDepartments(data) 
            }
        } catch (error) {
           if(error.response && !error.response.data.success){
            alert(error.response.data.error)
           }
        } finally {
            setDepLoading(false)
        }
    };

    useEffect(() => {
        fetchDepartments()
    },[])
    const filterDepartments = (e) => {
        const records = departments.filter((dep)=>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)

      };
    return (
        <>{depLoading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : 
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl">
                  <span className="text-2xl">🏢</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Department List</h2>
                  <p className="text-slate-600 font-medium">Manage organizational departments</p>
                </div>
              </div>
              <Link to="/admin-dashboard/add-department" className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                <span className="text-lg">➕</span>
                <span className="font-semibold">Add Department</span>
              </Link>
            </div>
            
            <div className="flex max-w-md mb-8">
              <input
                type="text"
                placeholder="Search by department name"
                className="flex-1 border border-slate-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-700"
                onChange={filterDepartments}
              />
              <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border border-purple-500 rounded-r-xl px-6 py-3 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                🔍 Search
              </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <DataTable 
                columns={columns}
                data={filteredDepartments}
                pagination
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#f8fafc',
                      borderBottom: '2px solid #e2e8f0',
                    },
                  },
                  headCells: {
                    style: {
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    },
                  },
                  cells: {
                    style: {
                      fontSize: '14px',
                      color: '#334155',
                    },
                  },
                  rows: {
                    style: {
                      '&:hover': {
                        backgroundColor: '#f1f5f9',
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      }</>
    )
}           
export default DepartmentList