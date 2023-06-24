const express = require('express');
const validate = require('../middlewares/validate');
const attendanceValidation = require('../validations/attendance.list.validation');
const attendanceController = require('../controllers/attendance.list.controller');
const shareValidation = require('../validations/share.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(attendanceValidation.createAttendance), attendanceController.createAttendance);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: AttendanceList
 *   description: Attendance List management and retrieval
 */

/**
 * @swagger
 * /attendanceList:
 *   post:
 *     summary: create student attendance
 *     description: create student attendance
 *     tags: [AttendanceList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             required:
 *               - name
 *             items:
 *              type: objects
 *              properties:
 *                attendanceId:
 *                  type: string
 *                studentId:
 *                  type: number
 *                isPresent:
 *                  type: boolean
 *              example:
 *                attendanceId: 1
 *                studentId: 5
 *                isPresent: true
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Attendance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
