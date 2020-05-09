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
router.get("/", isLoggedIn, listSubjects);

//Add a subject
router.get("/add", isLoggedIn, addSubject);
router.post("/saveSubject", isLoggedIn, saveSubject);

//Update a subject
router.get("/update/:id", isLoggedIn, updateSubject);
router.post("/updateSubjectDB/:id", isLoggedIn, updateSubjectDB);

//Delete a subject
router.get("/delete/:id", isLoggedIn, deleteSubject);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  return res.redirect("/");
}

module.exports = router;
