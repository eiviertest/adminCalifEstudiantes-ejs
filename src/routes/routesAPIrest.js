const { Router } = require("express");
const router = Router();

//Get student's model
const Student = require("../models/Student");
//Get career's model
const Career = require("../models/Career");
//Get grade's model
const Grade = require("../models/Grade");
//Get subject's model
const Subject = require("../models/Subject");

//See all careers
router.get("/careers", async (req, res) => {
  const careers = await Career.find();
  res.json(careers);
});

//Save a career in DB
router.post("/careers/save", async (req, res) => {
  //Create the object with module mongoose
  const saveCareer = new Career(req.body);
  //Save object created
  await saveCareer.save();
  res.send(saveCareer);
});

//Delete a career
router.delete("/careers/delete/:id", async (req, res) => {
  await Career.remove({ _id: req.params.id });
  res.json("Career deleted");
});

//See all career's subjects
router.get("/subjects", async (req, res) => {
  const subjects = await Subject.find();
  res.json(subjects);
});

//See all students
 router.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

//Add a student's grade
//When the route "/recordGrade" send information from his form, using form to catch it
router.post("/recordGrade/saveGrade", async (req, res) => {
  //Create a new object using the model Grade and his body use the request's body
  const grade = new Grade(req.body);
  //Save the information in DB
  await grade.save();
  res.json(grade);
});

module.exports = router;
