const Subject = require("../models/subject");

// dispaly all classes
module.exports.index = async (req, res) => {
  const subjects = await Subject.find({});
  res.render("classes/index", { subjects });
};

// Create new class
module.exports.renderNewForm = (req, res) => {
  res.render("classes/new");
};

// Create new Subject
module.exports.createNewSubject = async (req, res) => {
  const subject = new Subject({ ...req.body });
  await subject.save();
  res.redirect("/classes");
};

// dispaly a Subject
module.exports.showSubject = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findById(id).populate("students");
  res.render("classes/show", { subject });
};

// Edit Subject
module.exports.renderEditForm = async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  res.render("classes/edit", { subject });
};

//Edit Subject
module.exports.editSubject = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/classes/${subject._id}`);
};

// Delete Subject
module.exports.deleteSubject = async (req, res) => {
  const { id } = req.params;
  await Subject.findByIdAndDelete(id);
  res.redirect("/classes");
};
