const { Router } = require("express");
const router = Router();
//Get subject's model
const Subject = require("../models/Subject");
//Get student's model
const Student = require("../models/Student");

const {
  redirectPrincipal,
  recordGrade,
} = require("../controllers/controllerGrade");

//Redirect to principal page
router.get("/", redirectPrincipal);

//Render to view to record grade
router.get("/recordGrade", recordGrade);

//ComboBox Career
router.get('/careerCmb/:id'), async (req, res ) => {
    const { careerID } = req.params;
    const studentData = await Student.find({ careerID: careerID});
    res.send(studentData);
};

module.exports = router;
