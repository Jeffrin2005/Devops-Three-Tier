import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/leave.js';
import attendanceRouter from './routes/attendanceRoutes.js';
import settingRouter from './routes/setting.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

// Fix MongoDB Atlas DNS resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));

app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

const PORT = process.env.PORT || 5000;

const seedDefaultUsers = async () => {
    const users = [
        { name: "Admin", email: "admin@gmail.com", password: "admin", role: "admin" },
        { name: "Employee", email: "employee@gmail.com", password: "employee", role: "employee" },
    ];

    for (const userData of users) {
        const existing = await User.findOne({ email: userData.email });
        if (!existing) {
            const hashed = await bcrypt.hash(userData.password, 10);
            await User.create({ ...userData, password: hashed });
            console.log(`✅ Default user created: ${userData.email}`);
        } else {
            console.log(`⏭️  User already exists: ${userData.email}`);
        }
    }
};

mongoose.connect(process.env.MONGODB_URL)
    .then(async () => {
        console.log("✅ MongoDB Connected Successfully!");
        await seedDefaultUsers();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    });
