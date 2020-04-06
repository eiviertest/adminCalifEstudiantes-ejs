const { Router } = require("express");
const router = Router();
//Get subject's model
const Subject = require("../models/Subject");
//Get unitSubject's model
const UnitSubject = require("../models/UnitSubject");
//Get student's model
const Student = require("../models/Student");
//Get grade's model
const Grade = require("../models/Grade");
//Get career's model
const Career = require("../models/Career");

//Redirect to principal page
router.get("/", async (req, res) => {
  res.redirect("recordGrade");
});

//Render to view to record grade
router.get("/recordGrade", async (req, res) => {
  const grades = await Grade.find();
  const careers = await Career.find();
  res.render("grade/recordGrade", { careers, grades });
});

//Add a student's grade
router.post("/recordGrade/saveGrade", async (req, res) => {
  const grade = new Grade(req.body);
  await grade.save();
  res.redirect("/recordGrade");
});

//Render view to update student's grade
router.get("/recordGrade/update/:id", async (req, res) => {
  const grade = await Grade.findById(req.params.id);
  res.render("grade/updateGrade",{ grade });
});

//Update student's grade
router.post("/recordGrade/updateGradeDB/:id", async (req, res) => {
  await Grade.update({ _id: req.params.id }, req.body);
  res.redirect("/recordGrade");
});

//Delete student's grade
router.get("/recordGrade/delete/:id", async (req, res) => {
  await Grade.remove({ _id: req.params.id });
  res.redirect("/recordGrade");
});

//Use Ajax to work this comboBox; does not reload the page
//ComboBox Career
router.get("/recordGrade/careerCmb/:careerID", async (req, res) => {
    const { careerID } = req.params;
    const dataStudent = await Student.find({ careerID: careerID });
    res.send(dataStudent);
});

//ComboBox Student
router.get("/recordGrade/studentCmb/:grade/:carrerIDGlobal", async (req, res) => {
  const { grade, carrerIDGlobal } = req.params;
  console.log(grade);
  console.log(carrerIDGlobal);
  const dataSubject = await Subject.find({
    grade: grade,
    careerID: carrerIDGlobal,
  });
  res.send(dataSubject);
});

//ComboBox Subject
router.get("/recordGrade/unitCmb/:subjectID", async (req, res) => {
  const { subjectID } = req.params;
  const dataUnit = await UnitSubject.find({ subjectID: subjectID });
  res.send(dataUnit);
});

//ComboBox Unit
router.get("/recordGrade/viewRecordGrade/:unit/:subjectID/:studentID", async (req, res) => {
  const { unit, subjectID, studentID } = req.params;
  const grade = await Grade.findOne({
    subjectID: subjectID,
    studentID: studentID,
    noUnit: unit,
  });
  res.send(grade);
});

//Update Grades
router.post("/recordGrade/updateGrade/:unit/:subjectID/:studentID", async (req, res) => {
  const { unit, subjectID, studentID } = req.params;
  await Grade.update({
    subjectID: subjectID,
    studentID: studentID,
    noUnit: unit,
  }, req.body);
  res.redirect("/recordGrade");
});

module.exports = router;
