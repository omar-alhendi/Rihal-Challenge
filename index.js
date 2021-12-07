const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { averageAge } = require("./utils/utils");
const Subject = require("./models/subject");
const Student = require("./models/student");
const Country = require("./models/country");

const PORT = process.env.PORT || 3000;

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.set(path, path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/Rihal")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.log("Mongo Error");
  });

const subjectsRoutes = require("./routes/subjects");
const studentRouter = require("./routes/students");
const countriesRouter = require("./routes/countries");

app.use("/classes", subjectsRoutes);
app.use("/students", studentRouter);
app.use("/countries", countriesRouter);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/", async (req, res) => {
  const students = await Student.find({})
    .populate("country")
    .populate("subject");
  const countries = await Country.find({}).populate("students");
  const subjects = await Subject.find({}).populate("students");
  res.render("home", {
    students,
    countries,
    subjects,
    averageAge,
  });
});
app.listen(PORT, () => {
  console.log("Connected Port 3000");
});
