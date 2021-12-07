const mongoose = require("mongoose");
const { Schema } = mongoose;

const countrySchema = new Schema({
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

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
