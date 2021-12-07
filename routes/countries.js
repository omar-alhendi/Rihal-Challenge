const express = require("express");
const countries = require("../controllers/countries");
const router = express.Router();

router.route("/").get(countries.index).post(countries.createNewCountry);

router.get("/new", countries.renderNewCountryForm);
router
  .route("/:id")
  .get(countries.showCountry)
  .put(countries.editCountry)
  .delete(countries.deleteCountry);

router.get("/:id/edit", countries.renderEditCountryForm);

module.exports = router;
