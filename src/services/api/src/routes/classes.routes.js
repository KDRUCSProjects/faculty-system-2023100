const express = require('express');
const validate = require('../middlewares/validate');
const classesValidation = require('../validations/classes.validation');
const classController = require('../controllers/class.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), classController.getClasses)
  .post(auth(), validate(classesValidation.createClass), classController.createClass);

router
  .route('/:classId')
  .get(validate(classesValidation.getClass), classController.getClass)
  .delete(validate(classesValidation.getClass), classController.deleteClass);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: Classes management and retrieval
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: get all Classes
 *     description: Get All Classes.
 *     tags: [Classes]
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
 *                     $ref: '#/components/schemas/Classes'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Create an Class
 *     description: Add a new class.
 *     tags: [Classes]
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
 *               title : 2,
 *               educationalYearId : 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /classes/{id}:
 *   get:
 *     summary: Get an Class
 *     description: get single Class based on ID.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: classId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Classes'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an Class
 *     description: Delete an Class based on Id.
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: classId
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
