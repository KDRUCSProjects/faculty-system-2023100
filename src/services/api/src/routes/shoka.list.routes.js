const express = require('express');
const validate = require('../middlewares/validate');
const { shokaListValidation } = require('../validations');
const { shokaListController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(auth(), validate(shokaListValidation.createShokaList), shokaListController.createShokaList);
router
  .route('/students/:studentId')
  .get(auth(), validate(shokaListValidation.getStudentMarks), shokaListController.getStudentMarks);

router.route('/:subjectId').get(auth(), validate(shokaListValidation.getShokaList), shokaListController.getShokaList);
router
  .route('/shokas/:subjectId')
  .get(validate(shokaListValidation.getShokaList), shokaListController.createShokaInExcel);
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
 *           enum: [2,3]
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
 *               midtermMarks:
 *                 type: number
 *               assignmentOrProjectMarks:
 *                 type: number
 *               finalMarks:
 *                 type: number
 *             example:
 *               subjectId: 1
 *               studentId: 5
 *               midtermMarks: 16
 *               assignmentOrProjectMarks: 11
 *               finalMarks: 45
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
 *         description: subject id
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