const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const taajilValidation = require('../validations/taajil.validation');
const taajilController = require('../controllers/taajil.controller');

const router = express.Router();

// Create department, get, update and delete a department
router.route('/').post(auth(), validate(taajilValidation.createTaajil), taajilController.createTaajil);

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
