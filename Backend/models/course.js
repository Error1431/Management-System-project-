const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  description: String,
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 6
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  semester: {
    type: String,
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: Number,
  schedule: {
    days: [String],
    time: String,
    room: String
  },
  capacity: {
    type: Number,
    default: 30
  },
  enrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  prerequisites: [String],
  syllabus: String
}, {
  timestamps: true
});

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
