const express = require("express");
const students = require("../controllers/students");
const Student = require("../models/student");
const router = express.Router();

router.route("/").get(students.index).post(students.createNewStudent);

// new student
router.get("/new", students.renderNewStudentForm);

router
  .route("/:id")
  .get(students.showStudent)
  .put(students.updateStudent)
  .delete(students.deleteStudent);

// Edit Student
router.get("/:id/edit", students.renderStudentEditForm);

module.exports = router;
