const express = require("express");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//Initializations
const app = express();
require("./config/passport")(passport);

//Settings
app.set("port", process.env.PORT || 2000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Routes
const routesRecordGrade = require("./routes/routesGrade");
const routesCareer = require("./routes/routesCareer");
const routesStudent = require("./routes/routesStudent");
const routesSubject = require("./routes/routesSubject");
const routesUnitSubject = require("./routes/routesUnitSubject");
const routesAPIrest = require("./routes/routesAPIrest");

app.use("/recordGrade", routesRecordGrade);
app.use("/careers", routesCareer);
app.use("/students", routesStudent);
app.use("/subjects", routesSubject);
app.use("/unitSubject", routesUnitSubject);
app.use("/api", routesAPIrest);

require("./routes/routesUser")(app, passport);

//Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
