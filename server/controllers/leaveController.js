import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req,res)=>{
    try{
        const {userId,leaveType,startDate,endDate,reason} = req.body;
        const employee = await Employee.findOne({ userID: userId });
        if(!employee){
            return res.status(404).json({success:false, error:"Employee not found"});
        }
        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        })
        await newLeave.save()
        return res.status(200).json({success:true,message:"Leave added successfully"})
    }catch(error){
        return res.status(500).json({success:false, error:"Server error in adding leave"})
    }
}

const getLeave = async (req,res)=>{
    try{
        const {id} = req.params;
        let leaves = await Leave.find({ employeeId: id });
        if (!leaves || leaves.length === 0) {
            // id might be a userID
            const employee = await Employee.findOne({ userID: id });
            if (employee) {
                leaves = await Leave.find({ employeeId: employee._id });
            }
        }
        return res.status(200).json({success:true,leaves})
    }catch(error){
        return res.status(500).json({success:false, error:"Server error in getting leaves"})
    }
}

const getLeaves = async (req,res)=>{
    try{
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userID', select: 'name' }
            ]
        })
        return res.status(200).json({success:true,leaves})
    }catch(error){
        return res.status(500).json({success:false, error:"Server error in getting leaves"})
    }
}

const getLeaveDetail  = async (req,res)=>{
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id:id}).populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userID', select: 'name, profileImage' }
            ]
        })
        return res.status(200).json({success:true,leave})
    }catch(error){
        return res.status(500).json({success:false, error:"Server error in getting leaves"})
    }
}

const updateLeave  = async (req,res)=>{
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id:id},
            {status:req.body.status}
        )
        if(!leave){
            return res.status(404).json({success:false, error:"Leave not found"})
        }
                                       
        return res.status(200).json({success:true,message:"Leave updated successfully"})
    }catch(error){
        return res.status(500).json({success:false, error:"Server error in updating leave"})
    }
}
export {addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave}