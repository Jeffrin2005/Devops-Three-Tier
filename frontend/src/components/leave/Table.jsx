import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, LeaveButtons } from '../../utils/LeaveHelper'

const Table = () => {
    const [leaves, setLeaves] = useState(null)
    const [filteredLeaves , setFilteredLeaves]  = useState(null)      
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave',{
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(response.data.success){
                let sno = 1; 
                const data = response.data.leaves.map((leave) => {
                    return {
                        _id: leave._id,
                        sno: sno++,
                        employeeId: leave.employeeId.employeeID,
                        dep_name: leave.employeeId.department?.dep_name,
                        name: leave.employeeId.userID?.name,
                        leaveType: leave.leaveType,
                        department: leave.employeeId.department.dep_name,
                        days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
                        status: leave.status,
                        action: (<LeaveButtons Id={leave._id} />)
                    };
                });
                setLeaves(data);
                setFilteredLeaves(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    }
    useEffect(() => {
        fetchLeaves();
    }, [])
    const filterByInput = (e) => {
        if (!leaves) return;
        const data = leaves.filter((leave) =>
            leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredLeaves(data);
    }
       const filterByButton = (status) => {
        if (!leaves) return;
        const data = leaves.filter((leave) =>
            leave.status.toLowerCase().includes(status.toLowerCase())
        );
        setFilteredLeaves(data);
    }
    return (
        <>
        {filteredLeaves ? (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3 rounded-xl">
                  <span className="text-2xl">📅</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">Manage Leaves</h3>
                  <p className="text-slate-600 font-medium">Employee leave management system</p>
                </div>
              </div>
            </div>

            {/* Search bar & Filter buttons */}
            <div className="flex items-center justify-between mb-8 w-full">
              <input
                type="text"
                placeholder="Search by Employee ID"
                className="w-full max-w-md border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700"
                onChange={filterByInput}
              />
              <div className="flex space-x-3">
                <button type="button" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl whitespace-nowrap transition-all duration-200"
                  onClick={() => filterByButton("Pending")}>
                  ⏳ Pending
                </button>
                <button type="button" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl whitespace-nowrap transition-all duration-200"
                  onClick={() => filterByButton("Approved")}>
                  ✅ Approved
                </button>
                <button type="button" className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl whitespace-nowrap transition-all duration-200"
                  onClick={() => filterByButton("Rejected")}>
                  ❌ Rejected
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <DataTable 
                columns={columns} 
                data={filteredLeaves} 
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
    ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
        </div>
    )}
    </>
    );
}

export default Table
