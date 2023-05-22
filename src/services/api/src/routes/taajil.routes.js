const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const taajilValidation = require('../validations/taajil.validation');
const taajilController = require('../controllers/taajil.controller');
const { taajilService } = require('../services');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .post(validate(taajilValidation.createTaajil), taajilController.createTaajil)
  .get(validate(taajilValidation.studentsWithTaajil), taajilController.taajilStudents);

router.delete('/:studentId', validate(taajilValidation.deleteTaajil), taajilController.deleteTaajil);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Taajils
 *   description: Students' Taajils Management
 */

/**
 * @swagger
 * /taajils:
 *   get:
 *     summary: get all student that has taken Taajil
 *     description: Get all students with Taajil.
 *     tags: [Taajils]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: educationalYear
 *         schema:
 *           type: number
 *         description: Education Year e.g 1402
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
 *                     $ref: '#/components/schemas/Taajil'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /taajils:
 *   post:
 *     summary: Create Taajil
 *     description: Give a student a taajil or postponement of a specific year
 *     tags: [Taajils]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - educationalYear
 *               - regNumber
 *             properties:
 *               studentId:
 *                 type: number
 *               educationYearId:
 *                 type: number
 *               regNumber:
 *                 type: number
 *             example:
 *               studentId: 1
 *               educationalYear: 2023
 *               regNumber: 459
 *               attachment: photo
 *               notes: Personal Problems
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Taajil'
 *       "400":
 *         $ref: '#/components/responses/DuplicateTaajil'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /taajils/{studentId}:
 *   delete:
 *     summary: Delete a taajil from student
 *     description: delete any student based on their id and remove their taajil.
 *     tags: [Taajils]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: number
 *         description: Student id
 *     responses:
 *       "200":
 *         description: Deleted
 *         $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
