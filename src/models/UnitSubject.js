const { Schema, model } = require("mongoose");

const UnitSubjectSchema = new Schema(
  {
    noUnit: Number,
    nameUnit: String,
    hoursUnit: Number,
    hoursWeek: Number,
    subjectID: String,
  },
  { timestamps: true }
);

module.exports = model("UnitSubject", UnitSubjectSchema);
