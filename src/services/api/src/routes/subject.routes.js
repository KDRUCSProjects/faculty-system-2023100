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
  .patch(auth(), validate(subjectValidations.updatedSubject), subjectController.updatedSubject)
  .delete(auth(), validate(subjectValidations.getSubject), subjectController.deleteSubject);

router
  .route('/teachers/:teacherId')
  .get(validate(subjectValidations.getTeacherSubjects), subjectController.getTeacherSubjects);

router
  .route('/students/:subjectId')
  .get(validate(subjectValidations.getSemesterStudents), subjectController.getSemesterStudents);

router
  .route('/assign')
  .post(auth(), validate(subjectValidations.assignSubjectToTeacher), subjectController.assignSubjectToTeacher)

router
  .route('/take')
  .post(auth(), validate(subjectValidations.assignSubjectToTeacher), subjectController.takeBackSubjectFromTeacher);
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
 *   patch:
 *     summary: Update a Subject
 *     description: Update a Subject
 *     tags: [Subject]
 *     security: 
 *      - bearerAuth: []
 *     parameters: 
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: subject id
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
 *         description: ACCEPTED
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


/**
 * @swagger
 * /subjects/assign:
 *   post:
 *     summary: Assign Subjects to Teachers
 *     description: Assign Subjects to Teachers.
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
 *               - subjectId
 *             properties:
 *               subjectId:
 *                 type: number
 *               teacherId:
 *                 type: number
 *             example:
 *               subjectId: 8
 *               teacherId: 3
 *     responses:
 *       "202":
 *         description: ACCEPTED
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
 */


/**
 * @swagger
 * /subjects/take:
 *   post:
 *     summary: Take Back Subjects from Teachers
 *     description: Take Back Subjects from Teachers.
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
 *               - subjectId
 *             properties:
 *               subjectId:
 *                 type: number
 *               teacherId:
 *                 type: number
 *             example:
 *               subjectId: 8
 *               teacherId: 3
 *     responses:
 *       "202":
 *         description: ACCEPTED
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
 */


/**
 * @swagger
 * /subjects/teachers/{teacherId}:
 *   get:
 *     summary: Get all subjects of the teacher
 *     description: Get all subjects of the teacher.
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: number
 *         description: teacher id
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
 */

/**
 * @swagger
 * /subjects/students/{subjectId}:
 *   get:
 *     summary: Get all students to related subject or semester.
 *     description: Get all students to related subject or semester.
 *     tags: [Subject]
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
 *                $ref: '#/components/schemas/Subject'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
