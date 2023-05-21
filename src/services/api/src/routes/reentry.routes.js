const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const reentryValidation = require('../validations/reentry.validation');
const reentryController = require('../controllers/reentry.controller');

const router = express.Router();

// Create department, get, update and delete a department
router.route('/').post(auth(), validate(reentryValidation.createReentry), reentryController.createReentry);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Reentries
 *   description: Students' Reentries Management
 */

/**
 * @swagger
 * /reentries:
 *   post:
 *     summary: Create Reentry
 *     description: Give a student a reentry after Taajil or Mahromiat
 *     tags: [Reentries]
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
 *               notes: Because of Taajil or Mahromiat
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Reentry'
 *       "400":
 *         $ref: '#/components/responses/TripleReentry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
