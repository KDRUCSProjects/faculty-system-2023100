const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const reentryValidation = require('../validations/reentry.validation');
const reentryController = require('../controllers/reentry.controller');
const upload = require('../middlewares/multer');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .post(upload.single('attachment'), validate(reentryValidation.createReentry), reentryController.createReentry)
  .get(validate(reentryValidation.studentsWithReentry), reentryController.reentryStudents);

router.delete('/:id', validate(reentryValidation.deleteReentry), reentryController.deleteReentry);

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
 *   get:
 *     summary: get all student that has been given reentry
 *     description: Get all students with Reentry.
 *     tags: [Reentries]
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
 *                     $ref: '#/components/schemas/Reentry'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
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
 *       "406":
 *         $ref: '#/components/responses/DuplicateReentry'
 */

/**
 * @swagger
 * /reentries/{id}:
 *   delete:
 *     summary: Delete student from re-entry
 *     description: delete re-entry from students.
 *     tags: [Reentries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: re-entry id
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
