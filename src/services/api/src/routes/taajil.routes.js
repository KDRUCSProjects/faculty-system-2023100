const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { taajilValidation, shareValidation } = require('../validations');
const { taajilController } = require('../controllers');
const { taajilService } = require('../services');
const upload = require('../middlewares/multer');
const { attachAttachment } = require('../middlewares/attachFileToBody');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .get(auth(), validate(shareValidation.studentsWithTaajilReentryAndTabdili), taajilController.taajilStudents)
  .post(
    auth(),
    upload.single('attachment'),
    attachAttachment,
    validate(taajilValidation.createTaajil),
    taajilController.createTaajil
  );

router.delete('/:studentId', auth(), validate(taajilValidation.deleteTaajil), taajilController.deleteTaajil);

router
  .route('/:taajilId')
  .get(auth(), validate(taajilValidation.getTaajil), taajilController.getTaajil)
  .patch(
    auth(),
    upload.single('attachment'),
    attachAttachment,
    validate(taajilValidation.updateTaajil),
    taajilController.updateTaajil
  );

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
 *         name: taajilId
 *         schema:
 *           type: number
 *         description: taajil id
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: limit and default limit is 2000
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: number
 *                 format: number
 *                 required: true
 *               educationalYear:
 *                 type: number
 *                 format: number
 *                 required: true
 *               regNumber:
 *                 type: number
 *                 format: number
 *                 required: true
 *               notes:
 *                 type: string
 *                 format: text
 *               attachment:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *                 enum: [taajil, special_taajil]
 *                 required: true
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

/**
 * @swagger
 * /taajils/{taajilId}:
 *   get:
 *     summary: Get a tajil
 *     description: get single tajil based on ID.
 *     tags: [Taajils]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taajilId
 *         required: true
 *         schema:
 *           type: number
 *         description: taajil id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Taajil'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Update a Taajil
 *     description: Update a Taajil
 *     tags: [Taajils]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: taajilId
 *        required: true
 *        schema:
 *          type: number
 *        description: taajil id
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
 *                $ref: '#/components/schemas/Taajil'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
