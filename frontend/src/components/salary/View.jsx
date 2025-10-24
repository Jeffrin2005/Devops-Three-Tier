import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewSalary = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const lowerQuery = q.toLowerCase();
    const filteredRecords = salaries.filter((sal) => {
      const empId = sal?.employeeId?.employeeID || '';
      return empId.toLowerCase().includes(lowerQuery);
    });
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl">
                  <span className="text-2xl">💰</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">Salary Records</h2>
                  <p className="text-slate-600 font-medium">Employee salary information</p>
                </div>
              </div>
              <div className="flex w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search By Employee ID"
                  className="flex-1 border border-slate-300 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-slate-700"
                  onChange={(e) => filterSalaries(e.target.value)}
                />
                <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border border-green-500 rounded-r-xl px-6 py-3 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                  🔍 Search
                </button>
              </div>
            </div>
            {filteredSalaries.length > 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-700 uppercase bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold">S No</th>
                      <th className="px-6 py-4 font-semibold">Employee ID</th>
                      <th className="px-6 py-4 font-semibold">Basic Salary</th>
                      <th className="px-6 py-4 font-semibold">Allowances</th>
                      <th className="px-6 py-4 font-semibold">Deductions</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 font-semibold">Pay Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSalaries.map((salary, index) => (
                      <tr key={salary.id} className="hover:bg-slate-50 transition-colors duration-200">
                        <td className="px-6 py-4 font-medium text-slate-600">{index + 1}</td>
                        <td className="px-6 py-4 font-semibold text-slate-800">{salary?.employeeId?.employeeID || '-'}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">${salary.basicSalary}</td>
                        <td className="px-6 py-4 text-blue-600 font-semibold">${salary.allowances}</td>
                        <td className="px-6 py-4 text-red-600 font-semibold">${salary.deductions}</td>
                        <td className="px-6 py-4 text-slate-800 font-bold text-lg">${salary.netSalary}</td>
                        <td className="px-6 py-4 text-slate-600">
                          {new Date(salary.payDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-8 rounded-xl">
                  <span className="text-4xl mb-4 block">📊</span>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No Records Found</h3>
                  <p className="text-slate-500">No salary records available</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSalary;
