const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { shokaValidation } = require('../validations');
const { shokaController } = require('../controllers');

const router = express.Router();

router.route('/').get(auth(), shokaController.getShokas);

router.route('/:shokaId').get(auth(), validate(shokaValidation.getShoka), shokaController.getShoka);

router
  .route('/subject/:subjectId')
  .get(auth(), validate(shokaValidation.getShokaBySubjectId), shokaController.getShokaBySubjectId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Shoka
 *   description: Shoka management and retrieval
 */

/**
 * @swagger
 * /shoka:
 *   get:
 *     summary: get all shokas of every subject.
 *     description: get all shokas of every subject
 *     tags: [Shoka]
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
 *                 $ref: '#/components/schemas/Shoka'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shoka/{shokaId}:
 *   get:
 *     summary: Get shoka by id
 *     description: get a shoka by id.
 *     tags: [Shoka]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: shokaId
 *         required: true
 *         schema:
 *           type: number
 *         description: shoka id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Shoka'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /shoka/subject/{subjectId}:
 *   get:
 *     summary: Get shoka by subject id
 *     description: get a shoka by subject id.
 *     tags: [Shoka]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: number
 *         description: subject id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Shoka'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
