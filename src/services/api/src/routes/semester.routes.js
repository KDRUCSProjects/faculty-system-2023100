const express = require('express');
const validate = require('../middlewares/validate');
const { semesterValidation } = require('../validations');
const { semesterController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(semesterValidation.getSemesters), semesterController.getSemesters)
  .post(auth(), validate(semesterValidation.createSemester), semesterController.createSemester);

router
  .route('/:semesterId')
  .get(auth(), validate(semesterValidation.getSemester), semesterController.getSemester)
  .delete(auth(), validate(semesterValidation.getSemester), semesterController.deleteSemester);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Semester
 *   description: Semester management and retrieval
 */

/**
 * @swagger
 * /semesters:
 *   get:
 *     summary: get all Semesters
 *     description: Get All Semesters.
 *     tags: [Semester]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: Year to get all semesters
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
 *                     $ref: '#/components/schemas/Semester'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /semesters:
 *   post:
 *     summary: Create an semester
 *     description: There is no need of creating semesters when an educational year is created the Eight Semesters will be created automatically. But you can manually create a semester when there is no semester for the specific year
 *     tags: [Semester]
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
 *                 type: number
 *             example:
 *               title: 2
 *               educationalYearId: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Semester'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "406":
 *         $ref: '#/components/responses/DuplicateSemester'
 */

/**
 * @swagger
 * /semesters/{id}:
 *   get:
 *     summary: Get a Semester
 *     description: get single semester based on ID.
 *     tags: [Semester]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: semesterId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Semester'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a semester
 *     description: Delete an Semester based on Id.
 *     tags: [Semester]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: semesterId`
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
