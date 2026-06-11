const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  phone: String,
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  },
  major: String,
  year: {
    type: Number,
    min: 1,
    max: 4
  },
  gpa: {
    type: Number,
    min: 0,
    max: 4,
    default: 0
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
