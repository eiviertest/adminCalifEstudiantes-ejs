const { Router } = require("express");
const router = Router();

const {
  listCareers,
  addCareer,
  saveCareer,
  updateCareer,
  updateCareerDB,
  deleteCareer
} = require("../controllers/controllerCareer");

//See all careers
router.get("/", isLoggedIn, listCareers);

//Add a career
router.get("/add", isLoggedIn, addCareer);
router.post("/saveCareer", isLoggedIn, saveCareer);

//Update a career
router.get("/update/:id", isLoggedIn, updateCareer);
router.post("/updateCareerDB/:id", isLoggedIn, updateCareerDB);

//Delete a career
router.get("/delete/:id", isLoggedIn, deleteCareer);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  return res.redirect("/");
}

module.exports = router;
