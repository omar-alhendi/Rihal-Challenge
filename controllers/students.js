const Student = require("../models/student");
const Subject = require("../models/subject");
const Country = require("../models/country");
const { calculateAge } = require("../utils/utils");

// helper functions
function removeItemOnce(arr, value) {
  let index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

// helper functions
const save = async (arr) => {
  for (let i = 0; i < arr.length; i++) {
    await arr[i].save();
  }
};

const clearDeletedStudentSubject = async function (id) {
  const student = await Student.findById(id);
  if (student.subject) {
    const subject = await Subject.findById(student.subject);
    const currentSubjectArray = subject.students;
    const updatedSubjectArray = removeItemOnce(currentSubjectArray, id);
    subject.students = updatedSubjectArray;
    await subject.save();
  }
};

const clearDeletedStudentCountry = async function (id) {
  const student = await Student.findById(id);
  if (student.country) {
    const country = await Country.findById(student.country);
    const currentCountryArray = country.students;
    const updatedCountryArray = removeItemOnce(currentCountryArray, id);
    country.students = updatedCountryArray;
    await country.save();
  }
};

// all students
module.exports.index = async (req, res) => {
  const students = await Student.find({})
    .populate("country")
    .populate("subject");
  res.render("students/index", { students });
};

// new student
module.exports.renderNewStudentForm = async (req, res) => {
  const countries = await Country.find({});
  const subjects = await Subject.find({});
  res.render("students/new", { countries, subjects });
};

module.exports.createNewStudent = async (req, res) => {
  const data = req.body.student;
  const { name, date } = data;
  if (data.subject && data.country) {
    const country = await Country.findOne({ name: data.country });
    const subject = await Subject.findOne({ name: data.subject });
    const student = new Student({ name, date, country, subject });
    country.students.unshift(student);
    subject.students.unshift(student);
    await save([subject, country, student]);
  } else if (data.subject && !data.country) {
    const subject = await Subject.findOne({ name: data.subject });
    const student = new Student({ name, date, subject });
    subject.students.unshift(student);
    await save([subject, student]);
  } else if (data.country && !data.subject) {
    const country = await Country.findOne({ name: data.country });
    const student = new Student({ name, date, country });
    country.students.unshift(student);
    await save([country, student]);
  } else {
    const student = new Student({ name, date });
    await save([student]);
  }
  res.redirect("/students");
};

// student show page
module.exports.showStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate("country")
    .populate("subject");
  res.render("students/show", { student, calculateAge });
};

// Edit Student
module.exports.renderStudentEditForm = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id)
    .populate("subject")
    .populate("country");
  const countries = await Country.find({});
  const subjects = await Subject.find({});
  res.render("students/edit", { student, countries, subjects });
};

module.exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, date } = req.body.student;
  const data = req.body.student;
  let student = await Student.findById(id);
  if (data.subject && data.country) {
    await clearDeletedStudentCountry(id);
    await clearDeletedStudentSubject(id);
    student.country = undefined;
    student.subject = undefined;
    const country = await Country.findOne({ name: data.country });
    const subject = await Subject.findOne({ name: data.subject });
    student = { name, date, country, subject };
    student = await Student.findByIdAndUpdate(id, student);
    country.students.unshift(student);
    subject.students.unshift(student);
    await save([student, country, subject]);
  } else if (data.subject && !data.country) {
    await clearDeletedStudentSubject(id);
    student.subject = undefined;
    const subject = await Subject.findOne({ name: data.subject });
    student = { name, date, subject };
    student = await Student.findByIdAndUpdate(id, student);
    subject.students.unshift(student);
    await save([student, subject]);
  } else if (!data.subject && data.country) {
    await clearDeletedStudentCountry(id);
    student.country = undefined;
    const country = await Country.findOne({ name: data.country });
    student = { name, date, country };
    student = await Student.findByIdAndUpdate(id, student);
    country.students.unshift(student);
    await save([student, country]);
  } else {
    student = await Student.findByIdAndUpdate(id, { name, date });
    await student.save();
  }
  res.redirect(`/students/${id}`);
};

// Delete Student
module.exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  await clearDeletedStudentCountry(id);
  await clearDeletedStudentSubject(id);
  await Student.deleteOne(student);
  res.redirect("/students");
};
