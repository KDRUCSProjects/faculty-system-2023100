const express = require('express');
const validate = require('../middlewares/validate');
const attendanceValidation = require('../validations/attendance.list.validation');
const attendanceController = require('../controllers/attendance.list.controller');
const shareValidation = require('../validations/share.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

// router.route('/').post(validate(attendanceValidation.createAttendance), attendanceController.createAttendance);
module.exports = router;
