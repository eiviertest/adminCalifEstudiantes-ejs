//Create a controller object to admin the diferents operations of a CRUD
ctrlUnitSubject = {};
//Get subject's model
const Subject = require("../models/Subject");
//Get unitSubject's model
const UnitSubject = require("../models/UnitSubject");

//Render view to show all Unit-Subject
ctrlUnitSubject.listUnitSubject = async (req, res) => {
  const unitSubjects = await UnitSubject.find();
  res.render("unitSubject/listUnitSubject", { unitSubjects });
};

//Render form to add a Unit-Subject
ctrlUnitSubject.addUnitSubject = async (req, res) => {
  const subjects = await Subject.find();
  res.render("unitSubject/addUnitSubject", { subjects });
};

//Save a Unit-Subject in DB
ctrlUnitSubject.saveUnitSubject = async (req, res) => {
  //Create the object with module mongoose
  const saveUnitSubject = new UnitSubject(req.body);
  //Save object created
  await saveUnitSubject.save();
  res.redirect("/unitSubject");
};

//Render form to update a Unit-Subject
ctrlUnitSubject.updateUnitSubject = async (req, res) => {
  //Find a subject in DB with ID from request
  const unitSubject = await UnitSubject.findById(req.params.id);
  const subjects = await Subject.find();
  const subjectUnitSubject = await Subject.findById(unitSubject.subjectID);
  res.render("unitSubject/updateUnitSubject", { unitSubject, subjects, subjectUnitSubject });
};

//Update a Unit-Subject
ctrlUnitSubject.updateUnitSubjectDB = async (req, res) => {
  await UnitSubject.update({ _id: req.params.id }, req.body);
  res.redirect("/unitSubject");
};

//Delete a Unit-Subject
ctrlUnitSubject.deleteUnitSubject = async (req, res) => {
  await UnitSubject.remove({ _id: req.params.id });
  res.redirect("/unitSubject");
};

module.exports = ctrlUnitSubject;
