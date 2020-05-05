const express = require("express");
const path = require("path");
const morgan = require("morgan");

//Initializations
const app = express();

//Settings
app.set("port", process.env.PORT || 2000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

//Routes
const routesRecordGrade = require("./routes/routesGrade");
const routesCareer = require("./routes/routesCareer");
const routesStudent = require("./routes/routesStudent");
const routesSubject = require("./routes/routesSubject");
const routesUnitSubject = require("./routes/routesUnitSubject");
const routesAPIrest = require("./routes/routesAPIrest");

app.use("/", routesRecordGrade);
app.use("/careers", routesCareer);
app.use("/students", routesStudent);
app.use("/subjects", routesSubject);
app.use("/unitSubject", routesUnitSubject);
app.use("/api", routesAPIrest);

//Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
