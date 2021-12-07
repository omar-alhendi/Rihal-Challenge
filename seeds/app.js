const mongoose = require("mongoose");
const Student = require("../models/student");
const Country = require("../models/country");
const Subject = require("../models/subject");
const { names, dates, countries, subjects } = require("./seedHelpers");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/Rihal");
}

main()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error: " + err.message));

// pick a random number from the array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const generateUnique = (arr, num) => {
  let generate = [];
  for (let i = 0; i < num; i++) {
    generate.push(sample(arr));
  }
  let unique = generate.filter((item, i, ar) => ar.indexOf(item) === i);
  return unique;
};

const seedDB = async () => {
  await Student.deleteMany({});
  await Country.deleteMany({});
  await Subject.deleteMany({});

  const uniqueCountries = generateUnique(countries, 20);
  const uniqueSubjects = generateUnique(subjects, 20);

  for (let i = 0; i < 10; i++) {
    const country = new Country({
      name: uniqueCountries[i],
    });
    const subject = new Subject({
      name: uniqueSubjects[i],
    });
    await subject.save();
    await country.save();
  }
  const savedCountries = await Country.find({});
  const savedSubjects = await Subject.find({});
  const uniqueNames = generateUnique(names, 50);
  const uniqueDates = generateUnique(dates, 40);

  for (let i = 0; i < 20; i++) {
    const student = new Student({
      name: uniqueNames[i],
      date: uniqueDates[i],
      country: sample(savedCountries),
      subject: sample(savedSubjects),
    });

    const country = await Country.findById(student.country);
    country.students.push(student);
    await country.save();

    const subject = await Subject.findById(student.subject);
    subject.students.push(student);
    await subject.save();

    await student.save();
  }
};
seedDB().then(() => mongoose.connection.close());
