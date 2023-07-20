const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const { tabdiliValidation } = require('../validations');
const { tabdiliController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth(), tabdiliController.getTabdilis)
  .post(auth(), validate(tabdiliValidation.createTabdili), tabdiliController.createTabdili);

router
  .route('/:tabdiliId')
  .get(auth(), validate(tabdiliValidation.getTabdili), tabdiliController.getTabdili)
  .patch(auth(), validate(tabdiliValidation.updateTabdili), tabdiliController.updateTabdili)
  .delete(auth(), validate(tabdiliValidation.getTabdili), tabdiliController.deleteTabdili);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Tabdili
 *   description: Students' Tabdili Management
 */

/**
 * @swagger
 * /tabdili:
 *   get:
 *     summary: get all student that has taken Tabdili
 *     description: get all student that has taken Tabdili.
 *     tags: [Tabdili]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tabdili'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create Tabdili
 *     description: Give a student a Tabdili to an other university
 *     tags: [Tabdili]
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
 *                $ref: '#/components/schemas/Tabdili'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /tabdili/{tabdiliId}:
 *   get:
 *     summary: Get A student Tabdili
 *     description: get a student Tabdili
 *     tags: [Tabdili]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tabdiliId
 *         required: true
 *         schema:
 *           type: number
 *         description: Tabdili Id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Tabdili'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   patch:
 *     summary: Update a Tabdili
 *     description: Update a Tabdili
 *     tags: [Tabdili]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tabdiliId
 *         required: true
 *         schema:
 *           type: number
 *         description: Tabdili Id
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
 *                $ref: '#/components/schemas/Tabdili'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   delete:
 *     summary: Delete a tabdili
 *     description: delete a tabdili.
 *     tags: [Tabdili]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tabdiliId
 *         required: true
 *         schema:
 *           type: number
 *         description: Tabdili id
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
