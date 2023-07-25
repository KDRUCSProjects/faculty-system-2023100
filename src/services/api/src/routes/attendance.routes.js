const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { attendanceValidation } = require('../validations');
const { attendanceController } = require('../controllers');

const router = express.Router();

// router.route('/').get(auth(), attendanceController.getAttendances);
router
  .route('/todaysAttendance/:subjectId')
  .get(auth('takeAttendance'), validate(attendanceValidation.getTodaysAttendance), attendanceController.getTodaysAttendance)
  .post(
    auth('takeAttendance'),
    validate(attendanceValidation.takeTodaysAttendance),
    attendanceController.takeTodaysAttendance
  );

router
  .route('/:subjectId')
  .post(
    auth('takeAttendance'),
    validate(attendanceValidation.takeOneStdAttendance),
    attendanceController.takeOneStdAttendance
  );

router
  .route('/subject/:subjectId')
  .get(auth('takeAttendance'), validate(attendanceValidation.getAttendance), attendanceController.getAttendance);

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
 * /attendance/{subjectId}:
 *   post:
 *     summary: route to make a single student present or absent.
 *     description: route to make a single student present or absent.
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
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [one, two, both]
 *         description: select type to mark student absent ot present
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: number
 *               status:
 *                 type: boolean
 *             example:
 *               studentId: 1
 *               status: true
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

/**
 * @swagger
 * /attendance/todaysAttendance/{subjectId}:
 *   get:
 *     summary: route to get todays attendance.
 *     description: route to get todays attendance.
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

/**
 * @swagger
 * /attendance/todaysAttendance/{subjectId}:
 *   post:
 *     summary: Route to take attendance of all class.
 *     description: Route to take attendance of all class.
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
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [one, two, both]
 *         description: select type one or two
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               students:
 *                 type: array
 *                 items:
 *                   studentId:
 *                     type: number
 *                   status:
 *                     type: boolean
 *             example:
 *               students: [{studentId: 1, status: true}]
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
