const Country = require("../models/country");
const Student = require("../models/student");

// helper function
const clearAllStudentsCountries = async function (id) {
  const country = await Country.findById(id);
  const allStudents = [];
  for (let i = 0; i < country.students.length; i++) {
    let student = await Student.findById(country.students[i]);
    allStudents.unshift(student);
  }
  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].country = undefined;
    await allStudents[i].save();
  }
};

module.exports.index = async (req, res) => {
  const countries = await Country.find({});
  res.render("countries/index", { countries });
};

// create new country
module.exports.renderNewCountryForm = async (req, res) => {
  res.render("countries/new");
};

module.exports.createNewCountry = async (req, res) => {
  const country = new Country({ ...req.body });
  await country.save();
  res.redirect("/countries");
};

// dispaly country
module.exports.showCountry = async (req, res) => {
  const { id } = req.params;
  const country = await Country.findById(id).populate("students");
  res.render("countries/show", { country });
};

// Edit country
module.exports.renderEditCountryForm = async (req, res) => {
  const country = await Country.findById(req.params.id);
  res.render("countries/edit", { country });
};

module.exports.editCountry = async (req, res) => {
  const { id } = req.params;
  const country = await Country.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/countries/${country._id}`);
};

// Delete country
module.exports.deleteCountry = async (req, res) => {
  const { id } = req.params;
  await clearAllStudentsCountries(id);
  await Country.deleteOne({ _id: id });
  res.redirect("/countries");
};
