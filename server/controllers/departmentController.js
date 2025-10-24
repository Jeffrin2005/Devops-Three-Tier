import Department from "../models/Department.js";
import mongoose from "mongoose";

const getDepartments = async (req , res) => { 
    try { 
        const departments = await Department.find()
        return res.status(200).json({success: true,departments})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get departments server error"})
    }
}

const addDepartment = async (req , res) => {
    try {
        const {dep_name , description} = req.body;
        const newDep = new Department({
            dep_name , 
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, message: "Department created successfully", department: newDep})
       
    } catch (error) {
        return res.status(500).json({success: false, error: "Add department server error"})
    }   
}

const getDepartment = async (req , res) => {
    try {
        const {id} = req.params;
        console.log("Getting department with ID:", id);
        
        // Check if the provided id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log("Invalid ObjectId format:", id);
            return res.status(400).json({
                success: false, 
                error: "Invalid department ID format"
            });
        }
        
        const department = await Department.findById(id);
        console.log("Found department:", department);
        
        // Check if department exists
        if (!department) {
            console.log("Department not found for ID:", id);
            return res.status(404).json({
                success: false, 
                error: "Department not found"
            });
        }
        
        return res.status(200).json({success: true, department});
       
    } catch (error) {
        console.error("Get department error:", error);
        return res.status(500).json({success: false, error: "Get department server error"});
    }                                               
}

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dep_name, description } = req.body;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                error: "Invalid department ID format",
            });
        }

        // Build an update object dynamically to avoid overwriting fields with undefined
        const updateFields = {};
        if (dep_name !== undefined) updateFields.dep_name = dep_name;
        if (description !== undefined) updateFields.description = description;

        // Return new updated document
        const updatedDepartment = await Department.findByIdAndUpdate(id, updateFields, {
            new: true,
            runValidators: true,
        });

        if (!updatedDepartment) {
            return res.status(404).json({
                success: false,
                error: "Department not found",
            });
        }

        return res.status(200).json({ success: true, message: "Department updated successfully", department: updatedDepartment });
    } catch (error) {
        console.error("Update department error:", error);
        return res.status(500).json({ success: false, error: "Update department server error" });
    }
};

const deleteDepartment = async (req , res) => {
    try {
        const {id} = req.params;
        const deletedep = await Department.findById({_id:id})
        await deletedep.deleteOne()
        return res.status(200).json({success: true,deletedep})
    } catch (error) {
        return res.status(500).json({success: false, error: "Delete department server error"})
    }
}

export {addDepartment , getDepartments ,getDepartment, updateDepartment , deleteDepartment}