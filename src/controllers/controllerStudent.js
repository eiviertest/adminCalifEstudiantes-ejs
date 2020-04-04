//Create a controller object to admin the diferents operations of a CRUD
ctrlStudent = {};
//Get student's model
const Student = require("../models/Student");
//Get career's model
const Career = require("../models/Career");

//Render view to show all students
ctrlStudent.listStudents = async (req, res) => {
  const students = await Student.find().lean();
  res.render("student/listStudents", { students });
};

//Render form to add a student
ctrlStudent.addStudent = async (req, res) => {
  //Get all careers from DB
  const careers = await Career.find().lean();
  res.render("student/addStudent", { careers });
};

//Save a student in DB
ctrlStudent.saveStudent = async (req, res) => {
  //Destructuring from request
  const {
    firstName,
    fatherLastName,
    motherLastName,
    neighborhood,
    street,
    outside,
    inside,
    zipCode,
    number,
    email,
    currentGrade,
    careerID,
  } = req.body;
  console.log(req.body);
  //Create the object with module mongoose
  const saveStudentDB = new Student({
    firstName,
    fatherLastName,
    motherLastName,
    address: { neighborhood, street, outside, inside, zipCode },
    contact: { number },
    email,
    currentGrade,
    careerID,
  });
  //Save object created
  await saveStudentDB.save();
  res.redirect("/students");
};

//Render form to update a student
ctrlStudent.updateStudent = async (req, res) => {
  //Find a student in DB with ID from request
  const student = await Student.findById(req.params.id).lean();
  const careers = await Career.find().lean();
  res.render("student/updateStudent", { student, careers });
};

//Update a student
ctrlStudent.updateStudentDB = async (req, res) => {
  const {
    neighborhood,
    street,
    outside,
    inside,
    zipCode,
    number,
    email,
  } = req.body;
  await Student.findByIdAndUpdate
  (req.params.id, {
    address: { neighborhood, street, outside, inside, zipCode },
    contact: { number },
    email,
  });
  res.redirect("/students");
};

//Delete a student
ctrlStudent.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/students");
};

module.exports = ctrlStudent;
