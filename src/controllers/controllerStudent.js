//Create a controller object to admin the diferents operations of a CRUD
ctrlStudent = {};
//Get student's model
const Student = require("../models/Student");
//Get career's model
const Career = require("../models/Career");
//Get grade's model
const Grade = require("../models/Grade");

//Render view to show all students
ctrlStudent.listStudents = async (req, res) => {
  const students = await Student.find();
  res.render("student/listStudents", { students });
};

//Render form to add a student
ctrlStudent.addStudent = async (req, res) => {
  //Get all careers from DB
  const careers = await Career.find();
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
  const student = await Student.findById(req.params.id);
  const careerStudent = await Career.findById(student.careerID);
  res.render("student/updateStudent", { student, careerStudent });
};

//Update a student
ctrlStudent.updateStudentDB = async (req, res) => {
  //Destructuring assignment from request
  const {
    neighborhood,
    street,
    outside,
    inside,
    zipCode,
    number,
    email,
  } = req.body;
  await Student.update(
    { _id: req.params.id },
    {
      address: { neighborhood, street, outside, inside, zipCode },
      contact: { number },
      email,
    }
  );
  res.redirect("/students");
};

//Delete a student
ctrlStudent.deleteStudent = async (req, res) => {
  const gradeStudentDB = Grade.find({ studentID: req.params.id });
  if ((await gradeStudentDB).length == 0) {
    await Student.remove({ _id: req.params.id });
  }
  res.redirect("/students");
};


module.exports = ctrlStudent;
