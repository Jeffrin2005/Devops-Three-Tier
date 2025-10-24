import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EmployeeButtons, columns as employeeColumns } from "../../utils/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async () => {
        setEmpLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/employee',{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success){
                let sno = 1; 
                const data = await response.data.employees.map((emp) => (
                    {
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department?.dep_name,
                        name: emp.userID?.name,
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage:
    <img src={`http://localhost:5000/${emp.userID?.profileImage}`}/>,
                        action: (<EmployeeButtons Id={emp._id}/>),
                    })); 
                setEmployees(data);
                setFilteredEmployees(data);
            }
        } catch (error) {
           if(error.response && !error.response.data.success){
            alert(error.response.data.error)
           }
        } finally {
            setEmpLoading(false)
        }
    };

    useEffect(() => {
        fetchEmployees()
    },[]);

    // Search filter handler
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (!value) {
            setFilteredEmployees(employees);
            return;
        }
        const lower = value.toLowerCase();
        const filtered = employees.filter(emp => emp.name.toLowerCase().includes(lower));
        setFilteredEmployees(filtered);
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-xl">
                            <span className="text-2xl">👥</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800">Manage Employee</h2>
                            <p className="text-slate-600 font-medium">Employee Management System</p>
                        </div>
                    </div>
                    <Link to="/admin-dashboard/add-employee" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
                        <span className="text-lg">➕</span>
                        <span className="font-semibold">Add New Employee</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Search by employee name"
                            value={searchTerm}
                            className="flex-1 border border-slate-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-700"
                            onChange={handleSearchChange}
                        />
                        <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 border border-emerald-500 rounded-r-xl px-6 py-3 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                            🔍 Search
                        </button>
                    </div>
                </div>

                {/* Employee Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <DataTable 
                        columns={employeeColumns}
                        data={filteredEmployees}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        progressPending={empLoading}
                        highlightOnHover
                        responsive
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
    );
}

export default List

        