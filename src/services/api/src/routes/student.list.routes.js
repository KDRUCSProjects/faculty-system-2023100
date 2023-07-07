const express = require('express');
const validate = require('../middlewares/validate');
const { studentListValidation, shareValidation } = require('../validations');
const { studentListController } = require('../controllers');
const auth = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(studentListValidation.getStudentLists), studentListController.getStudentLists)
  .post(auth(), validate(studentListValidation.createStudentList), studentListController.createStudentList)
  .delete(auth(), validate(shareValidation.deleteBunch), studentListController.deleteBunch);

router.route('/promote').post(auth(), validate(shareValidation.deleteBunch), studentListController.promoteStudents);

router
  .route('/:studentListId')
  .delete(auth(), validate(studentListValidation.getStudentList), studentListController.deleteStudentList);

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
 *   get:
 *     summary: get all student list
 *     description: get all student list
 *     tags: [StudentList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: semesterId
 *         schema:
 *           type: integer
 *         description: semester id
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *         description: year
 *       - in: query
 *         name: class
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 4
 *         description: class number
 *       - in: query
 *         name: semester
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 8
 *         description: semester number
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: limit and default limit is 2000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StudentList'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
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
 *   delete:
 *     summary: delete a bunch of students from a semester
 *     description: delete a bunch of students from a semester
 *     tags: [StudentList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: integer
 *               enum: [1,2,3,4,5]
 *             example:
 *               [1,2,4,5]
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

/**
 * @swagger
 * /studentList/promote:
 *   post:
 *     summary: promote students to next semester
 *     description: promote students to next semester
 *     tags: [StudentList]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: integer
 *               enum: [1,2,3,4,5]
 *             example:
 *               [1,2,4,5]
 *     responses:
 *       "204":
 *         description: NO_CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /studentList/{studentListId}:
 *   delete:
 *     summary: delete student list
 *     description: delete student list
 *     tags: [StudentList]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentListId
 *         required: true
 *         schema:
 *           type: string
 *         description: student list Id
 *     responses:
 *       "204":
 *         description: NO_CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
