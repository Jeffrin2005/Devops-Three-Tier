import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'

const SummaryCard = () => {
    const {user}  = useAuth()
    return (
        <div className="bg-white shadow rounded-md overflow-hidden flex items-center">
           <div className={`h-full flex items-center justify-center bg-teal-600 text-white p-4`}>
            <FaUser/>
           </div>
         <div className="px-4 py-3" >
            <p className="text-sm text-gray-500">Welcome Back</p>
            <p className="text-xl font-semibold">{user.name}</p>
         </div>
        </div>
    )
}
export default SummaryCard
