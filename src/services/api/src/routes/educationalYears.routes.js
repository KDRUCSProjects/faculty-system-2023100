const express = require('express');
const validate = require('../middlewares/validate');
const educationalYearValidation = require('../validations/educationalYear.validation');
const educationalYearController = require('../controllers/educationalYear.controller');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');

const router = express.Router();

router
  .route('/')
  .get(educationalYearController.getEducationalYears)
  .post(validate(educationalYearValidation.createEducationalYear), educationalYearController.createEducationalYear);

router
  .route('/:yearId')
  .get(validate(educationalYearValidation.getEducationalYear), educationalYearController.getEducationalYear)
  .delete(validate(educationalYearValidation.getEducationalYear), educationalYearController.deleteEducationalYear);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Students management and retrieval
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: get all student
 *     description: Get All Students.
 *     tags: [Students]
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
 *                     $ref: '#/components/schemas/Student'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student
 *     description: Add a new student of a faculty.
 *     tags: [Students]
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
 *             example:
 *               kankorId : L2700283
 *               fullName : شمس الله
 *               nickname : شمسی
 *               fatherName : عبدالروف
 *               grandFatherName : محمد طاهر
 *               province : کندهار
 *               division : 6
 *               district : 15 District
 *               engName : shamsullah shamsi
 *               engFatherName : Abdul Rauf
 *               engGrandFatherName : Muhammad Tahir
 *               educationalYear: 2023
 *               admissionYear : 2019
 *               photo : Needs Real Photo Not Value
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student
 *     description: get single student based on Id to view his information.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Student
 *     description: Update any value of the student.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
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
 *             example:
 *               kankorId : L2700283
 *               fullName : شمس الله
 *               nickname : شمسی
 *               fatherName : عبدالروف
 *               grandFatherName : محمد طاهر
 *               province : کندهار
 *               division : 6
 *               district : 15 District
 *               engName : shamsullah shamsi
 *               engFatherName : Abdul Rauf
 *               engGrandFatherName : Muhammad Tahir
 *               educationalYear: 2023
 *               admissionYear : 2019
 *               photo : Needs Real Photo Not Value
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Student
 *     description: Delete Any Student based on Id.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
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
