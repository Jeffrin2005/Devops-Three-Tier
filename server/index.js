import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import connectToDatabase from './db/db.js';
import dotenv from 'dotenv';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js'
dotenv.config(); // loads variables from .env into process.env

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard',dashboardRouter)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});