const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const { student, course, date } = req.query;
        const query = {};

        if (student) query.student = student;
        if (course) query.course = course;
        if (date) query.date = new Date(date);

        const attendance = await Attendance.find(query)
            .populate('student', 'studentId')
            .populate('course', 'courseCode courseName');

        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
});

router.post('/', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const attendance = new Attendance(req.body);
        await attendance.save();

        res.status(201).json({ message: 'Attendance created successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error creating attendance', error: error.message });
    }
});

router.put('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        res.json({ message: 'Attendance updated successfully', attendance });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
});

router.delete('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        res.json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting attendance', error: error.message });
    }
});

module.exports = router;