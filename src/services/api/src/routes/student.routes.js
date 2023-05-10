const express = require('express');
const validate = require('../middlewares/validate');
const studentValidation = require('../validations/students.validations');
const studentController = require('../controllers/student.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/')
    .post(auth(), validate(studentValidation.registerStudent), studentController.registerStudent);

module.exports = router;

