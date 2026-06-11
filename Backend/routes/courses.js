const express = require('express');
const router = express.Router();
const courseController = require('../controller/controllers/usercontrols');
const { auth, authorize } = require('../middleware/auth');

router.post('/', auth, authorize('admin', 'teacher'), courseController.createCourse);
router.get('/', auth, courseController.getAllCourses);
router.get('/:id', auth, courseController.getCourseById);
router.put('/:id', auth, authorize('admin', 'teacher'), courseController.updateCourse);
router.delete('/:id', auth, authorize('admin'), courseController.deleteCourse);

module.exports = router;
