const express = require('express');
const router = express.Router();
const Grade = require('../models/grades');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const { student, course } = req.query;
        const query = {};

        if (student) query.student = student;
        if (course) query.course = course;

        const grades = await Grade.find(query)
            .populate('student', 'studentId')
            .populate('course', 'courseCode courseName');

        res.json(grades);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching grades', error: error.message });
    }
});

router.post('/', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const grade = new Grade(req.body);
        if (typeof grade.calculateGrade === 'function') {
            grade.calculateGrade();
        }
        await grade.save();

        res.status(201).json({ message: 'Grade created successfully', grade });
    } catch (error) {
        res.status(500).json({ message: 'Error creating grade', error: error.message });
    }
});

router.put('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);

        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        Object.assign(grade, req.body);
        if (typeof grade.calculateGrade === 'function') {
            grade.calculateGrade();
        }
        await grade.save();

        res.json({ message: 'Grade updated successfully', grade });
    } catch (error) {
        res.status(500).json({ message: 'Error updating grade', error: error.message });
    }
});

router.delete('/:id', auth, authorize('admin', 'teacher'), async (req, res) => {
    try {
        const grade = await Grade.findByIdAndDelete(req.params.id);

        if (!grade) {
            return res.status(404).json({ message: 'Grade not found' });
        }

        res.json({ message: 'Grade deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting grade', error: error.message });
    }
});

module.exports = router;