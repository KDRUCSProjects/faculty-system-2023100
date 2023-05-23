const express = require('express');
const validate = require('../middlewares/validate');
const educationalYearValidation = require('../validations/educationalYear.validation');
const educationalYearController = require('../controllers/educationalYear.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), educationalYearController.getEducationalYears)
  .post(auth(), validate(educationalYearValidation.createEducationalYear), educationalYearController.createEducationalYear);

router
  .route('/:yearId')
  .get(auth(), validate(educationalYearValidation.getEducationalYear), educationalYearController.getEducationalYear)
  .delete(auth(), validate(educationalYearValidation.getEducationalYear), educationalYearController.deleteEducationalYear);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: EducationalYear
 *   description: Educational Year management and retrieval
 */

/**
 * @swagger
 * /years:
 *   get:
 *     summary: get all educational years
 *     description: Get All EducationalYears.
 *     tags: [EducationalYear]
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
 *                     $ref: '#/components/schemas/EducationalYear'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /years:
 *   post:
 *     summary: Create an Educational Year
 *     description: Add a new educational year.
 *     tags: [EducationalYear]
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
 *               educationalYear : 2019
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EducationalYear'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "406":
 *         $ref: '#/components/responses/DuplicateYear'
 */

/**
 * @swagger
 * /years/{id}:
 *   get:
 *     summary: Get an EducationalYear
 *     description: get single year based on ID.
 *     tags: [EducationalYear]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: EducationalYearId id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/EducationalYear'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an Educational Year
 *     description: Delete an educationalYear based on Id.
 *     tags: [EducationalYear]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: EducationalYear id
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
