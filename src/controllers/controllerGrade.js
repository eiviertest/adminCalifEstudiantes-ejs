//Create a controller object to admin the diferents operations of a CRUD
ctrlGrade = {};
//Get career's model
const Career = require("../models/Career");

//Redirect to principal page
ctrlGrade.redirectPrincipal = async (req, res) => {
  res.redirect("recordGrade");
};

//Render to view to record grade
ctrlGrade.recordGrade = async (req, res) => {
    const careers = await Career.find().lean();
  res.render("grade/recordGrade", { careers });
};

module.exports = ctrlGrade;
