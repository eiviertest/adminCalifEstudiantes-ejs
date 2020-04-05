const { Router } = require("express");
const router = Router();

const {
  listSubjects,
  addSubject,
  saveSubject,
  updateSubject,
  updateSubjectDB,
  deleteSubject
} = require("../controllers/controllerSubject");

//See all subjects
router.get("/", listSubjects);

//Add a subject
router.get("/add", addSubject);
router.post("/saveSubject", saveSubject);

//Update a subject
router.get("/update/:id", updateSubject);
router.post("/updateSubjectDB/:id", updateSubjectDB);

//Delete a subject
router.get("/delete/:id", deleteSubject);

module.exports = router;
