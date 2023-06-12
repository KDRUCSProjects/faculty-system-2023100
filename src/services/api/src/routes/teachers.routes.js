const express = require('express');
const validate = require('../middlewares/validate');
const teacherValidation = require('../validations/teachers.validation');
const teacherController = require('../controllers/teacher.controller');
const shareValidation = require('../validations/share.validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(auth(), validate(shareValidation.paginate), teacherController.getTeachers);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: teachers management and retrieval
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: get all teachers based on createdAt timeStamp
 *     description: get all teachers based on createdAt timeStamp
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: page
 *        in: query
 *        description: The page number for pagination
 *        schema:
 *          type: integer
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
