import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext'
import axios from 'axios';
const Setting = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const [setting, setSetting] = useState({
    userId:user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(setting.newPassword !== setting.confirmPassword){
        setError("New password and confirm password do not match")   
    }else{
        try {
            const response = await axios.put(
              'http://localhost:5000/api/setting/change-password',
                setting,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if(response.data.success){
                navigate('/admin-dashboard/employees');
                setError("")
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }
        }
    }

  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">⚙️</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Change Password</h1>
          <p className="text-slate-600 font-medium">Update your account security</p>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span className="font-semibold">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={setting.oldPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={setting.newPassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={setting.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>🔒</span>
              <span>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;