const mongoose = require("mongoose");
const { Schema } = mongoose;

// used for hthe middle ware
// const Country = require("./country");
// const Subject = require("./subject");

const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name cannot be empty"],
  },
  date: {
    type: String,
    required: [true, "Birth Date cannot be empty"],
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

// a middleware to remove the student from the students array in coutry and subject
// studentSchema.post("findOneAndDelete", async function (data) {
//   function removeItemOnce(arr, value) {
//     let index = arr.indexOf(value);
//     if (index > -1) {
//       arr.splice(index, 1);
//     }
//     return arr;
//   }
//   if (data) {
//     // removing student from the students array in the COUNTRY schema
//     const country = await Country.findById(data.country);
//     const currentCountryArray = country.students;
//     const updatedCountryArray = removeItemOnce(currentCountryArray, data._id);
//     country.students = updatedCountryArray;
//     await country.save();
//     // removing student from the students array in the SUBJECT schema
//     const subject = await Subject.findById(data.subject);
//     const currentSubjectArray = subject.students;
//     const updatedSubjectArray = removeItemOnce(currentSubjectArray, data._id);
//     subject.students = updatedSubjectArray;
//     await subject.save();
//   }
// });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
