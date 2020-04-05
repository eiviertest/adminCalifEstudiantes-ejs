const { Router } = require("express");
const router = Router();

const {
  listUnitSubject,
  addUnitSubject,
  saveUnitSubject,
  updateUnitSubject,
  updateUnitSubjectDB,
  deleteUnitSubject
} = require("../controllers/controllerUnitSubject");

//See all Unit-Subject
router.get("/", listUnitSubject);

//Add a Unit-Subject
router.get("/add", addUnitSubject);
router.post("/saveUnitSubject", saveUnitSubject);

//Update a Unit-Subject
router.get("/update/:id", updateUnitSubject);
router.post("/updateUnitSubject/:id", updateUnitSubjectDB);

//Delete a Unit-Subject
router.get("/delete/:id", deleteUnitSubject);

module.exports = router;
