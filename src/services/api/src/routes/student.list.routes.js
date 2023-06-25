const express = require('express');
const validate = require('../middlewares/validate');
const { studentListValidation } = require('../validations');
const { studentListController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(studentListValidation.createStudentList), studentListController.createStudentList);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: StudentList
 *   description: student List management and retrieval
 */

/**
 * @swagger
 * /studentList:
 *   post:
 *     summary: add student to a semester
 *     description: add student to a semester
 *     tags: [StudentList]
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
 *               studentId:
 *                 type: number
 *               semesterId:
 *                 type: number
 *             example:
 *               studentId: 101
 *               semesterId: 4
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/StudentList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
