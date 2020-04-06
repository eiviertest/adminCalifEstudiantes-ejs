const { Schema, model } = require("mongoose");

const GradeSchema = new Schema(
  {
    studentID: String,
    subjectID: String,
    noUnit: Number,
    grade: Number,
    gradeR1: Number,
    gradeR2: Number,
    gradeGlobal: Number,
  },
  { timestamps: true }
);

module.exports = model("Grade", GradeSchema);
