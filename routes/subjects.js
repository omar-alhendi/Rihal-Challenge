const express = require("express");
const subjects = require("../controllers/subjects");
const router = express.Router();

router.route("/").get(subjects.index).post(subjects.createNewSubject);

router.get("/new", subjects.renderNewForm);

router
  .route("/:id")
  .get(subjects.showSubject)
  .put(subjects.editSubject)
  .delete(subjects.deleteSubject);

router.get("/:id/edit", subjects.renderEditForm);

module.exports = router;
