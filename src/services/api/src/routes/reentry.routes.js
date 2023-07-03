const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { reentryValidation, shareValidation } = require('../validations');
const { reentryController } = require('../controllers');
const upload = require('../middlewares/multer');
const { attachAttachment } = require('../middlewares/attachFileToBody');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .get(validate(shareValidation.studentsWithTaajilReentryAndTabdili), reentryController.reentryStudents)
  .post(
    upload.single('attachment'),
    attachAttachment,
    validate(reentryValidation.createReentry),
    reentryController.createReentry
  );

router
  .route('/:id')
  .delete(validate(reentryValidation.deleteReentry), reentryController.deleteReentry)
  .patch(
    upload.single('attachment'),
    attachAttachment,
    validate(reentryValidation.updateReentry),
    reentryController.updateReentry
  );

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
 *     summary: get all student that has taken reentries
 *     description: Get all students with Reentries.
 *     tags: [Reentries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: educationalYear
 *         schema:
 *           type: number
 *         description: Education Year e.g 1402
 *       - in: query
 *         name: studentId
 *         schema:
 *           type: number
 *         description: student id
 *       - in: query
 *         name: kankorId
 *         schema:
 *           type: string
 *         description: kankor id
 *       - in: query
 *         name: reentryId
 *         schema:
 *           type: number
 *         description: reentry id
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: limit
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reentry'
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: number
 *                 format: number
 *                 schema:
 *                   required: true
 *               educationalYear:
 *                 type: number
 *                 format: number
 *                 schema:
 *                   required: true
 *               regNumber:
 *                 type: number
 *                 format: number
 *                 schema:
 *                   required: true
 *               notes:
 *                 type: string
 *                 format: text
 *               attachment:
 *                 type: string
 *                 format: binary
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
 *   patch:
 *     summary: Update a Reentry
 *     description: Update a Reentry
 *     tags: [Reentries]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: number
 *        description: Reentry id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: number
 *                 format: number
 *               educationalYear:
 *                 type: number
 *                 format: number
 *               regNumber:
 *                 type: number
 *                 format: number
 *               notes:
 *                 type: string
 *                 format: textArea
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "202":
 *         description: ACCEPTED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Reentry'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
