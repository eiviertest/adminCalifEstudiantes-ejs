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
router.get("/", listCareers);

//Add a career
router.get("/add", addCareer);
router.post("/saveCareer", saveCareer);

//Update a career
router.get("/update/:id", updateCareer);
router.post("/updateCareerDB/:id", updateCareerDB);

//Delete a career
router.get("/delete/:id", deleteCareer);

module.exports = router;
