const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  assignments: [{
    name: String,
    maxScore: Number,
    score: Number,
    weight: Number,
    date: Date
  }],
  midterm: {
    score: Number,
    maxScore: Number,
    weight: Number
  },
  final: {
    score: Number,
    maxScore: Number,
    weight: Number
  },
  totalScore: Number,
  letterGrade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']
  },
  semester: String,
  year: Number
}, {
  timestamps: true
});

// Calculate total score and letter grade
gradeSchema.methods.calculateGrade = function () {
  let total = 0;

  // Calculate assignment scores
  if (this.assignments && this.assignments.length > 0) {
    const assignmentTotal = this.assignments.reduce((sum, assignment) => {
      return sum + (assignment.score / assignment.maxScore) * assignment.weight;
    }, 0);
    total += assignmentTotal;
  }

  // Add midterm
  if (this.midterm && this.midterm.score) {
    total += (this.midterm.score / this.midterm.maxScore) * this.midterm.weight;
  }

  // Add final
  if (this.final && this.final.score) {
    total += (this.final.score / this.final.maxScore) * this.final.weight;
  }

  this.totalScore = total;

  // Assign letter grade
  if (total >= 97) this.letterGrade = 'A+';
  else if (total >= 93) this.letterGrade = 'A';
  else if (total >= 90) this.letterGrade = 'A-';
  else if (total >= 87) this.letterGrade = 'B+';
  else if (total >= 83) this.letterGrade = 'B';
  else if (total >= 80) this.letterGrade = 'B-';
  else if (total >= 77) this.letterGrade = 'C+';
  else if (total >= 73) this.letterGrade = 'C';
  else if (total >= 70) this.letterGrade = 'C-';
  else if (total >= 60) this.letterGrade = 'D';
  else this.letterGrade = 'F';

  return this.letterGrade;
};

module.exports = mongoose.models.Grade || mongoose.model('Grade', gradeSchema);
