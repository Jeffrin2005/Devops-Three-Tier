import express from "express";
import { markAttendance, getAttendanceByDate, getEmployeeAttendance, getAttendanceSummary } from "../controllers/attendanceController.js";
import verifyUser from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only admin can mark and view overall attendance
router.use(verifyUser);
router.use(authorizeRoles(["admin"]));

router.post("/", markAttendance); // mark or update
router.get("/", getAttendanceByDate); // list for date: /attendance?date=YYYY-MM-DD
router.get("/summary", getAttendanceSummary); // summary range
router.get("/:id", getEmployeeAttendance); // employee report

export default router;
