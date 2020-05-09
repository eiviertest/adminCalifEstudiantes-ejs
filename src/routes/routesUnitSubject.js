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
router.get("/", isLoggedIn, listUnitSubject);

//Add a Unit-Subject
router.get("/add", isLoggedIn, addUnitSubject);
router.post("/saveUnitSubject", isLoggedIn, saveUnitSubject);

//Update a Unit-Subject
router.get("/update/:id", isLoggedIn, updateUnitSubject);
router.post("/updateUnitSubject/:id", isLoggedIn, updateUnitSubjectDB);

//Delete a Unit-Subject
router.get("/delete/:id", isLoggedIn, deleteUnitSubject);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  return res.redirect("/");
}

module.exports = router;
