const express = require('express');
const validate = require('../middlewares/validate');
const shokaListValidation = require('../validations/shoka.list.validation');
const shokaListController = require('../controllers/shoka.list.controller');
const shareValidation = require('../validations/share.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(shokaListValidation.createShokaList), shokaListController.createShokaList);

router
  .route('/:shokaId')
  .get(validate({ ...shokaListValidation.getShokaList, ...shareValidation.paginate }), shokaListController.getShokaList);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ShokaList
 *   description: Shoka List management and retrieval
 */

/**
 * @swagger
 * /shokaList:
 *   post:
 *     summary: Create shoka list student
 *     description: Add a new shoka list.
 *     tags: [ShokaList]
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
 *               semesterId:
 *                 type: number
 *               teacherId:
 *                 type: number
 *             example:
 *               shokaFK: 1
 *               studentFK: 5
 *               midtermMarks: 16
 *               assignmentOrProjectMarks: 11
 *               finalMarks: 45
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "406":
 *          $ref: '#/components/responses/DuplicateShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shokaList/{id}:
 *   get:
 *     summary: Get shoka list
 *     description: get a shoka list.
 *     tags: [ShokaList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: shoka id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/ShokaList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
