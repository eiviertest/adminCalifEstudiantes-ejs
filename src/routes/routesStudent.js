const { Router } = require("express");
const router = Router();

const {
  listStudents,
  addStudent,
  saveStudent,
  updateStudent,
  updateStudentDB,
  deleteStudent
} = require("../controllers/controllerStudent");

//See all students
router.get("/", listStudents);

//Add a student
router.get("/add", addStudent);
router.post("/saveStudent", saveStudent);

//Update a student
router.get("/update/:id", updateStudent);
router.post("/updateStudent/:id", updateStudentDB);

//Delete a student
router.get("/delete/:id", deleteStudent);

module.exports = router;
