const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { monfaqiValidation, shareValidation } = require('../validations');
const { monfaqiController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(shareValidation.studentsWithTaajilReentryAndTabdili), monfaqiController.getMonfaqies)
  .post(auth(), validate(monfaqiValidation.createMonfaqi), monfaqiController.createMonfaqi);

router
  .route('/:monfaqiId')
  .get(auth(), validate(monfaqiValidation.getMonfaqi), monfaqiController.getMonfaqi)
  .patch(auth(), validate(monfaqiValidation.updateMonfaqi), monfaqiController.updateMonfaqi)
  .delete(auth(), validate(monfaqiValidation.getMonfaqi), monfaqiController.deleteMonfaqi);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Monfaqi
 *   description: Students' Monfaqi Management
 */

/**
 * @swagger
 * /monfaqi:
 *   get:
 *     summary: get all student that has taken monfaqi
 *     description: get all student that has taken monfaqi.
 *     tags: [Monfaqi]
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
 *         name: monfaqiId
 *         schema:
 *           type: number
 *         description: monfaqi id
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
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Monfaqi'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create Monfaqi
 *     description: Give a student a Monfaqi.
 *     tags: [Monfaqi]
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
 *               year:
 *                 type: number
 *               regNumber:
 *                 type: number
 *             example:
 *               studentId: 1
 *               year: 2023
 *               regNumber: 459
 *               attachment: photo
 *               notes: Personal Problems
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Monfaqi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /monfaqi/{monfaqiId}:
 *   get:
 *     summary: Get A student Monfaqi
 *     description: get a student Monfaqi
 *     tags: [Monfaqi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: monfaqiId
 *         required: true
 *         schema:
 *           type: number
 *         description: Monfaqi Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Monfaqi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   patch:
 *     summary: Update a Monfaqi
 *     description: Update a Monfaqi
 *     tags: [Monfaqi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: monfaqiId
 *         required: true
 *         schema:
 *           type: number
 *         description: Monfaqi Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: number
 *               educationYear:
 *                 type: number
 *               regNumber:
 *                 type: number
 *               attachment:
 *                 type: string
 *               notes:
 *                 type: string
 *             example:
 *               studentId: 1
 *               educationalYear: 2023
 *               regNumber: 459
 *               attachment: photo
 *               notes: Personal Problems
 *     responses:
 *       "202":
 *         description: Accepted
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Monfaqi'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   delete:
 *     summary: Delete a Monfaqi
 *     description: delete a Monfaqi.
 *     tags: [Monfaqi]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: monfaqiId
 *         required: true
 *         schema:
 *           type: number
 *         description: monfaqi id
 *     responses:
 *       "204":
 *         description: Deleted and No Content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
