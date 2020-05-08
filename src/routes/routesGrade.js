//Get router from express module
const { Router } = require("express");
//Variable assignment and initialization
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

/*
//Redirect to principal page
router.get("/", async (req, res) => {
  //Redirect from "/" to "/recordGrade"
  res.redirect("recordGrade");
});
*/

//Render to view to record grade
//When the route is "/recordGrade", use an async arrow function with request and response
router.get("/recordGrade", isLoggedIn, async (req, res) => {
  //Find all grades from DB using model Grade
  const grades = await Grade.find();
  //Find all career from DB using model Grade
  const careers = await Career.find();
  //Render view from path "/grade/recordGrade" with two params; careers and grades
  res.render("grade/recordGrade", { careers, grades, user: req.user });
});

//Add a student's grade
//When the route "/recordGrade" send information from his form, using form to catch it
router.post("/recordGrade/saveGrade", async (req, res) => {
  //Create a new object using the model Grade and his body use the request's body
  const grade = new Grade(req.body);
  //Save the information in DB
  await grade.save();
  //Redirect to principal page
  res.redirect("/recordGrade");
});

//Render view to update student's grade
router.get("/recordGrade/update/:id", async (req, res) => {
  //Find student's grade from DB
  const grade = await Grade.findById(req.params.id);
  //Redirect page to update a student with his grade as param
  res.render("grade/updateGrade", { grade });
});

//Update student's grade
//Page to update student's grade send information and it's received by post method
router.post("/recordGrade/updateGradeDB/:id", async (req, res) => {
  //Update student's data in DB
  await Grade.update({ _id: req.params.id }, req.body);
  //Redirect to principal page
  res.redirect("/recordGrade");
});

//Delete student's grade
router.get("/recordGrade/delete/:id", async (req, res) => {
  //Delete student's grade in DB
  await Grade.remove({ _id: req.params.id });
  res.redirect("/recordGrade");
});

//Use Ajax to work this comboBox; does not reload the page
//ComboBox Career
router.get("/recordGrade/careerCmb/:careerID", async (req, res) => {
  //Destructuring assignment from request's params
  const { careerID } = req.params;
  //Find students' data in DB
  const dataStudent = await Student.find({ careerID: careerID });
  //Send information to the route that requested it
  res.send(dataStudent);
});

//ComboBox Student
router.get(
  "/recordGrade/studentCmb/:grade/:carrerIDGlobal",
  async (req, res) => {
    //Destructuring assignment from request's params
    const { grade, carrerIDGlobal } = req.params;
    //Find subjects' data in DB with constraints
    const dataSubject = await Subject.find({
      grade: grade,
      careerID: carrerIDGlobal,
    });
    //Send information to the route that requested it
    res.send(dataSubject);
  }
);

//ComboBox Subject
router.get("/recordGrade/unitCmb/:subjectID", async (req, res) => {
  //Destructuring assignment from request's params
  const { subjectID } = req.params;
  //Find units' data in DB with constraints
  const dataUnit = await UnitSubject.find({ subjectID: subjectID });
  //Send information to the route that requested it
  res.send(dataUnit);
});

//ComboBox Unit
router.get(
  "/recordGrade/viewRecordGrade/:unit/:subjectID/:studentID",
  async (req, res) => {
    //Destructuring assignment from request's params
    const { unit, subjectID, studentID } = req.params;
    //Find student's grade in DB with constraints
    const grade = await Grade.findOne({
      subjectID: subjectID,
      studentID: studentID,
      noUnit: unit,
    });
    //Send information to the route that requested it
    res.send(grade);
  }
);

//Update Grades
router.post(
  "/recordGrade/updateGrade/:unit/:subjectID/:studentID",
  async (req, res) => {
    //Destructuring assignment from request's params
    const { unit, subjectID, studentID } = req.params;
    //Update student's grade in DB with constraints
    await Grade.update(
      {
        subjectID: subjectID,
        studentID: studentID,
        noUnit: unit,
      },
      req.body
    );
    //Redirect to principal page
    res.redirect("/recordGrade");
  }
);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  return res.redirect("/");
}

module.exports = router;
