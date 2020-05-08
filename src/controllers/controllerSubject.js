//Create a controller object to admin the diferents operations of a CRUD
ctrlSubject = {};
//Get subject's model
const Subject = require("../models/Subject");
//Get career's model
const Career = require("../models/Career");

//Render view to show all subjects
ctrlSubject.listSubjects = isLoggedIn, async (req, res) => {
  const subjects = await Subject.find();
  res.render("subject/listSubjects", { subjects });
};

//Render form to add a subject
ctrlSubject.addSubject = isLoggedIn, async (req, res) => {
  const careers = await Career.find();
  res.render("subject/addSubject", { careers });
};

//Save a subject in DB
ctrlSubject.saveSubject = isLoggedIn, async (req, res) => {
  //Create the object with mongoose module
  const saveSubject = new Subject(req.body);
  //Save object created
  await saveSubject.save();
  res.redirect("/subjects");
};

//Render form to update a career
ctrlSubject.updateSubject = isLoggedIn, async (req, res) => {
  //Find a subject in DB with ID from request
  const subject = await Subject.findById(req.params.id);
  const careers = await Career.find();
  const careerSubject = await Career.findById(subject.careerID);
  res.render("subject/updateSubject", { subject, careers, careerSubject });
};

//Update a career
ctrlSubject.updateSubjectDB = isLoggedIn, async (req, res) => {
  await Subject.update({ _id: req.params.id }, req.body);
  res.redirect("/subjects");
};

//Delete a career
ctrlSubject.deleteSubject = isLoggedIn, async (req, res) => {
  await Subject.remove({ _id: req.params.id });
  res.redirect("/subjects");
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  return res.redirect("/");
}

module.exports = ctrlSubject;
