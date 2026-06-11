const express = require('express');
const router = express.Router();
const studentController = require('../controller/studentcontroller');
const { auth, authorize } = require('../middleware/auth');

router.get('/', auth, studentController.getAllStudents);
router.get('/:id', auth, studentController.getStudentById);
router.get('/:id/stats', auth, studentController.getStudentStats);
router.put('/:id', auth, authorize('admin', 'teacher'), studentController.updateStudent);
router.delete('/:id', auth, authorize('admin'), studentController.deleteStudent);
router.post('/enroll', auth, authorize('admin', 'teacher'), studentController.enrollCourse);

module.exports = router;
