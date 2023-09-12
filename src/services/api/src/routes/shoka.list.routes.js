const express = require('express');
const validate = require('../middlewares/validate');
const { shokaListValidation } = require('../validations');
const { shokaListController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('takeAttendance'), validate(shokaListValidation.createShokaList), shokaListController.createShokaList);

router
  .route('/students/:studentId')
  .get(auth('takeAttendance'), validate(shokaListValidation.getStudentMarks), shokaListController.getStudentMarks);

router
  .route('/:shokalistId')
  .patch(auth('takeAttendance'), validate(shokaListValidation.updateShokaList), shokaListController.updateShokaList)
  .delete(auth('takeAttendance'), validate(shokaListValidation.deleteShokaList), shokaListController.deleteShokaList);

router
  .route('/:subjectId')
  .get(auth('takeAttendance'), validate(shokaListValidation.getShokaList), shokaListController.getShokaList);
router
  .route('/shokas/:subjectId')
  .get(auth('takeAttendance'), validate(shokaListValidation.getShokaList), shokaListController.createShokaInExcel);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ShokaList
 *   description: Shoka List management and retrieval
 */

/**
 * @swagger
 * /shokaList:
 *   post:
 *     summary: Create shoka list student
 *     description: Add a new shoka list.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: chance
 *         schema:
 *           type: number
 *           enum: [2,3,4]
 *         description: if you want create first chance marks do not send query parameters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               subjectId:
 *                 type: number
 *               studentId:
 *                 type: number
 *               projectMarks:
 *                 type: number
 *               assignment:
 *                 type: number
 *               finalMarks:
 *                 type: number
 *               practicalWork:
 *                 type: number
 *             example:
 *               subjectId: 1
 *               studentId: 5
 *               projectMarks: 16
 *               assignment: 11
 *               finalMarks: 45
 *               practicalWork: 8
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "406":
 *          $ref: '#/components/responses/DuplicateShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shokaList/{shokalistId}:
 *   patch:
 *     summary: update marks of student only by admin.
 *     description: update marks of student only by admin.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shokalistId
 *         schema:
 *           type: number
 *         description: shoka list id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               subjectId:
 *                 type: number
 *               studentId:
 *                 type: number
 *               projectMarks:
 *                 type: number
 *               assignment:
 *                 type: number
 *               finalMarks:
 *                 type: number
 *               practicalWork:
 *                 type: number
 *             example:
 *               projectMarks: 16
 *               assignment: 11
 *               finalMarks: 45
 *               practicalWork: 8
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "406":
 *          $ref: '#/components/responses/DuplicateShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   delete:
 *     summary: delete marks of student only by admin.
 *     description: delete marks of student only by admin.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shokalistId
 *         schema:
 *           type: number
 *         description: shoka list id
 *     responses:
 *       "206":
 *         description: NO CONTENT
 *       "406":
 *          $ref: '#/components/responses/DuplicateShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shokaList/{subjectId}:
 *   get:
 *     summary: Get marks of the subjects.
 *     description: Get marks of the subjects.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: number
 *         description: subject id
 *       - in: query
 *         name: chance
 *         required: true
 *         schema:
 *           type: number
 *           enum: [1,2,3,4]
 *         description: chance
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shokaList/students/{studentId}:
 *   get:
 *     summary: get student marks
 *     description: get student marks.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: number
 *         description: student id
 *       - in: query
 *         name: semester
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 8
 *         description: semester number
 *       - in: query
 *         name: class
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *         description: class number
 *       - in: query
 *         name: semesterId
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: semester id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shokaList/shokas/{subjectId}:
 *   get:
 *     summary: get a subject shoka in excel.
 *     description: get a subject shoka in excel.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         schema:
 *           type: number
 *           required: true
 *         description: subject id
 *       - in: query
 *         name: chance
 *         required: true
 *         schema:
 *           type: number
 *           enum: [1,2,3,4]
 *         description: chance
 *     responses:
 *       "200":
 *         description: OK AND EXCEL FILE WILL BE SENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
