import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Mark or update attendance for an employee for a specific date (defaults to today)
export const markAttendance = async (req, res) => {
  try {
    const { employeeId, status, date } = req.body;

    if (!employeeId || !status) {
      return res.status(400).json({ success: false, error: "employeeId & status are required" });
    }

    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0); // normalize

    // ensure employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ success: false, error: "Employee not found" });

    const updated = await Attendance.findOneAndUpdate(
      { employee: employeeId, date: attendanceDate },
      { status },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate({ path: "employee", populate: { path: "userID department" } });

    return res.status(200).json({ success: true, attendance: updated });
  } catch (error) {
    console.error("Mark attendance error", error);
    return res.status(500).json({ success: false, error: "Server error while marking attendance" });
  }
};

// Get attendance list for a particular date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const attendanceDate = date ? new Date(date) : new Date();
    attendanceDate.setHours(0, 0, 0, 0);

    const records = await Attendance.find({ date: attendanceDate }).populate({
      path: "employee",
      populate: [{ path: "userID" }, { path: "department" }],
    });

    return res.status(200).json({ success: true, records });
  } catch (error) {
    console.error("Get attendance by date error", error);
    return res.status(500).json({ success: false, error: "Server error while fetching attendance" });
  }
};

// Get attendance report for an employee (all records)
export const getEmployeeAttendance = async (req, res) => {
  try {
    const { id } = req.params; // employee id

    const records = await Attendance.find({ employee: id }).sort({ date: -1 });
    return res.status(200).json({ success: true, records });
  } catch (error) {
    console.error("Employee attendance report error", error);
    return res.status(500).json({ success: false, error: "Server error while fetching attendance report" });
  }
};

// Admin summary of attendance for a range
export const getAttendanceSummary = async (req, res) => {
  try {
    const { start, end } = req.query; // YYYY-MM-DD
    const startDate = start ? new Date(start) : new Date();
    const endDate = end ? new Date(end) : new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const records = await Attendance.aggregate([
      { $match: { date: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({ success: true, summary: records });
  } catch (error) {
    console.error("Attendance summary error", error);
    return res.status(500).json({ success: false, error: "Server error while fetching summary" });
  }
};
