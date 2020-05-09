//Destructuring assignment from express module
const { Router } = require("express");
//Variable assignment and initialization
const router = Router();

//Destructuring assignment from student's controller
const {
  listStudents,
  addStudent,
  saveStudent,
  updateStudent,
  updateStudentDB,
  deleteStudent
} = require("../controllers/controllerStudent");

//See all students
router.get("/", isLoggedIn, listStudents);

//Add a student
router.get("/add", isLoggedIn, addStudent);
router.post("/saveStudent", isLoggedIn, saveStudent);

//Update a student
router.get("/update/:id", isLoggedIn, updateStudent);
router.post("/updateStudent/:id", isLoggedIn, updateStudentDB);

//Delete a student
router.get("/delete/:id", isLoggedIn, deleteStudent);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  return res.redirect("/");
}

module.exports = router;
