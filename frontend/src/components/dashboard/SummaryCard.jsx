import React from 'react'

const SummaryCard = ({ icon, text, number, bgColor = 'bg-gradient-to-r from-teal-500 to-teal-600' }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex items-center border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
           <div className={`h-full flex items-center justify-center ${bgColor} text-white p-6 shadow-lg`}>
            {icon}
           </div>
         <div className="px-6 py-4 flex-1" >
            <p className="text-sm text-slate-600 font-medium mb-1">{text}</p>
            <p className="text-2xl font-bold text-slate-800">{number}</p>
         </div>
        </div>
    )
}
export default SummaryCard
