const Student = require('../models/Student');
const User = require('../model/user');
const Course = require('../models/Course');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, major, year } = req.query;

    const query = {};

    if (major) query.major = major;
    if (year) query.year = year;

    const students = await Student.find(query)
      .populate('userId', 'firstName lastName email')
      .populate('courses', 'courseName courseCode')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('userId', '-password')
      .populate('courses');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('userId', '-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Deactivate user instead of deleting
    await User.findByIdAndUpdate(student.userId, { isActive: false });

    res.json({ message: 'Student deactivated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
};

// Enroll student in course
exports.enrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    // Check if already enrolled
    if (student.courses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Check course capacity
    if (course.enrolled.length >= course.capacity) {
      return res.status(400).json({ message: 'Course is full' });
    }

    student.courses.push(courseId);
    course.enrolled.push(studentId);

    await student.save();
    await course.save();

    res.json({ message: 'Enrolled successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error: error.message });
  }
};

// Get student dashboard statistics
exports.getStudentStats = async (req, res) => {
  try {
    const studentId = req.params.id;

    const student = await Student.findById(studentId)
      .populate('courses');

    const Grade = require('../models/grades');
    const grades = await Grade.find({ student: studentId })
      .populate('course', 'courseName courseCode');

    const Attendance = require('../models/attendance');
    const attendance = await Attendance.find({ student: studentId });

    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'present').length;
    const attendancePercentage = totalClasses > 0 ? (presentClasses / totalClasses) * 100 : 0;

    res.json({
      student,
      enrolledCourses: student.courses.length,
      gpa: student.gpa,
      grades: grades.length,
      attendancePercentage: attendancePercentage.toFixed(2),
      recentGrades: grades.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
};
