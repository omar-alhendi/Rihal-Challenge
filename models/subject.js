const mongoose = require("mongoose");
const { Schema } = mongoose;
const Student = require("./student");

const subjectSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name Cannot Be Empty"],
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

// middleware to remove the subject of every student after deleting his subject
subjectSchema.post("findOneAndDelete", async function (data) {
  if (data) {
    const allStudents = [];
    for (let i = 0; i < data.students.length; i++) {
      let student = await Student.findById(data.students[i]);
      allStudents.push(student);
    }
    for (let i = 0; i < allStudents.length; i++) {
      allStudents[i].subject = undefined;
      await allStudents[i].save();
    }
  }
});

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
