const express = require('express');
const validate = require('../middlewares/validate');
const subjectValidations = require('../validations/subject.validation');
const subjectController = require('../controllers/subject.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(subjectController.getSubjects)
  .post(validate(subjectValidations.createSubject), subjectController.createSubject);

router
  .route('/:subjectId')
  .get(validate(subjectValidations.getSubject), subjectController.getSubject)
  .delete(validate(subjectValidations.getSubject), subjectController.deleteSubject);

module.exports = router;
