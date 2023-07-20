const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { attendanceValidation } = require('../validations');
const { attendanceController } = require('../controllers');

const router = express.Router();

router.route('/').get(auth(), attendanceController.getAttendances);

router
  .route('/:attendanceId')
  .get(auth(), validate(attendanceValidation.getAttendanceById), attendanceController.getAttendanceById);

router
  .route('/subject/:subjectId')
  .get(auth(), validate(attendanceValidation.getAttendance), attendanceController.getAttendance);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: Attendance management and retrieval
 */

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: get attendances of every subject.
 *     description: get all attendances of every subject
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Attendance'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /attendance/{attendanceId}:
 *   get:
 *     summary: Get Attendance by id
 *     description: get a Attendance by id.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Attendance id
 *     responses:
 *       "200":
 *         description: OK
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

/**
 * @swagger
 * /attendance/subject/{subjectId}:
 *   get:
 *     summary: Get Attendance by subject id
 *     description: get a Attendance by subject id.
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: subject id
 *     responses:
 *       "200":
 *         description: OK
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
