import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import multer from "multer"
import path from "path"
import Department from "../models/Department.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + path.extname(file.originalname))

    }
  })

const upload = multer({ storage: storage })

const addEmployee = async (req,res) => {
    try{
 
        const{
            name,
            email,
            employeeID,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already registered in employee"
            })
        }    
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        })
        const savedUser = await newUser.save()

        const newEmployee = new Employee({
            userID: savedUser._id,
            employeeID,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            
        })
        await newEmployee.save()
        return res.status(200).json({
            success:true,
            message:"Employee created successfully"
        })
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Server error in adding employee"
        })
    }

}

const getEmployees = async (req, res) => { 
    try { 
        const employees = await Employee.find()
            .populate('userID', { password: 0 })
            .populate("department")
        return res.status(200).json({success: true,employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get employees server error"})
    }
}

const getEmployee = async (req, res) => { 
    const {id} = req.params; 

    try { 
        let employee;                       
        employee = await Employee.findById(id)
            .populate('userID', { password: 0 })
            .populate("department");
            if(!employee){
                employee = await Employee.findOne({ userID: id })
                .populate('userID', { password: 0 })
                .populate("department");
            }
        return res.status(200).json({success: true,employee})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get employees server error"})
    }
}

const updateEmployee = async (req, res) => {
      try{
        const {id} = req.params;
        const{
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id:id})
        if(!employee){
            return res.status(404).json({success: false, error: "Employee not found"})
        }

        const user = await User.findById({_id: employee.userID})
        if(!user){
            return res.status(404).json({success: false, error: "User not found"})
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userID}, { name })
        const updateEmployee = await Employee.findByIdAndUpdate({_id:id},
            {
                maritalStatus
                ,designation,
                salary, department})
        if(!updateEmployee || !updateUser){
            return res.status(404).json({success: false, error: "document not found"})
        }
        return res.status(200).json({success: true, message: "Employee updated successfully"})

      }catch(error){
        return res.status(500).json({success: false, error: "Update employees server error"})
      }
}



const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params; 

    try { 
        const employees = await Employee.find({department:id})
        
        return res.status(200).json({success: true,employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "Get employeesByDepID server error"})
    }
}

export {addEmployee, upload , getEmployees, getEmployee , updateEmployee,fetchEmployeesByDepId} 