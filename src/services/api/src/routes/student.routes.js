const express = require('express');
const validate = require('../middlewares/validate');
const studentValidation = require('../validations/students.validations');
const studentController = require('../controllers/student.controller');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = express.Router();

router
  .route('/')
  .get(auth(), studentController.getStudents)
  .post(auth(), upload.single('photo'), validate(studentValidation.registerStudent), studentController.registerStudent);

router
  .route('/:studentId')
  .get(auth(), validate(studentValidation.getStudent), studentController.getStudent)
  .patch(auth(), upload.single('photo'), validate(studentValidation.updateStudent), studentController.updateStudent)
  .delete(auth(), validate(studentValidation.getStudent), studentController.deleteStudent);

module.exports = router;
