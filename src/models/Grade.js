const { Schema, model } = require("mongoose");

const CalificacionSchema = new Schema(
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

module.exports = model("Calificacion", CalificacionSchema);
