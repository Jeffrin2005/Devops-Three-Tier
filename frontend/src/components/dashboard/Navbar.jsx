import React from 'react'
import { useAuth } from '../../context/authContext';

const Navbar = () => {
    const {user , logout} = useAuth()
    return (
        <div className="bg-gradient-to-r from-white to-slate-50 shadow-lg rounded-xl px-6 py-4 mb-6 flex justify-between items-center border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg">
                <span className="text-white text-lg">👋</span>
              </div>
              <p className="text-slate-800 font-semibold text-lg">Welcome {user.name}</p>
            </div>
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            onClick={logout}
            >
            <span>🚪</span>
            <span>Logout</span>
            </button>
        </div>
    )
}

export default Navbar