const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Student data
let students = [];

// Test backend
app.get("/", (req, res) => {
    res.send("Student Management System Backend is running");
});

// GET all students
app.get("/api/students", (req, res) => {
    res.json(students);
});

// POST - Register student
app.post("/api/register", (req, res) => {

    const { name, rollno, section, course } = req.body;

    // Validate input
    if (!name || !rollno || !section || !course) {
        return res.status(400).json({
            success: false,
            message: "Please fill all student details"
        });
    }

    // Create student
    const student = {
        id: students.length + 1,
        name: name,
        rollno: rollno,
        section: section,
        course: course
    };

    // Store student
    students.push(student);

    console.log("Student registered:");
    console.log(student);

    // Send response
    res.status(201).json({
        success: true,
        message: `${name} registered successfully!`,
        student: student
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});