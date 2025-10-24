import mongoose from "mongoose";
import { Schema } from "mongoose";

const attendanceSchema = new Schema({
    employee:{type:Schema.Types.ObjectId,ref:"Employee",required:true},
    date:{type:Date,required:true},
    status:{
        type:String,
        enum:["present","absent","sick","leave"],
        required:true
    }
},{timestamps:true});

attendanceSchema.index({employee:1,date:1},{unique:true});

const Attendance = mongoose.model("Attendance",attendanceSchema);
export default Attendance;
