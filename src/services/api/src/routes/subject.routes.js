const express = require('express');
const validate = require('../middlewares/validate');
const subjectValidations = require('../validations/subject.validation');
const subjectController = require('../controllers/subject.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), subjectController.getSubjects)
  .post(auth(), validate(subjectValidations.createSubject), subjectController.createSubject);

router
  .route('/:subjectId')
  .get(auth(), validate(subjectValidations.getSubject), subjectController.getSubject)
  .delete(auth(), validate(subjectValidations.getSubject), subjectController.deleteSubject);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: Subject management and retrieval
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: get all subjects
 *     description: Get All Subjects.
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Subject'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a Subject alongside Shoka and Attendance
 *     description: Add a new subject.
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               semesterId:
 *                 type: number
 *               teacherId:
 *                 type: number
 *             example:
 *               name: Big Data
 *               semesterId: 8
 *               teacherId: 3
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get an Subject
 *     description: get single subject based on ID.
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Subject
 *     description: Delete a subject based on Id.
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: subject id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
