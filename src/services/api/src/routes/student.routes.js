const express = require('express');
const validate = require('../middlewares/validate');
const studentValidation = require('../validations/students.validations');
const studentController = require('../controllers/student.controller');
const shareValidation = require('../validations/share.validation');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const { attachImageToBody } = require('../middlewares/attachFileToBody');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(shareValidation.paginate), studentController.getStudents)
  .post(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(studentValidation.registerStudent),
    studentController.registerStudent
  )
  .delete(auth(), validate(studentValidation.deleteStudents), studentController.deleteStudents);

router
  .route('/:studentId')
  .get(auth(), validate(studentValidation.getStudent), studentController.getStudent)
  .patch(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(studentValidation.updateStudent),
    studentController.updateStudent
  )
  .delete(auth(), validate(studentValidation.getStudent), studentController.deleteStudent);

router.route('/kankor/:kankorId').get(auth(), validate(studentValidation.kankor), studentController.getStudentOnKankorId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Students management and retrieval
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: get all student
 *     description: Get All Students.
 *     tags: [Students]
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
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Student'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student
 *     description: Add a new student to faculty. The following fields are required, But you can add nickName   province  division  district  engName engFatherName  engGrandFatherName admissionYear photo these fields too.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kankorId:
 *                 type: string
 *                 required: true
 *                 format: text
 *               fullName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               fatherName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               grandFatherName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               educationalYear:
 *                 type: string
 *                 required: true
 *                 format: number
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 
 *   delete:
 *     summary: delete a bunch of students
 *     description: delete a bunch of students.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             required:
 *               - name
 *             items:
 *              type: object
 *              properties:
 *                studentId: number
 *              example: 
 *                studentId: 1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student
 *     description: get single student based on Id to view his information.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Student
 *     description: Update any value of the student.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               kankorId:
 *                 type: string
 *                 required: true
 *                 format: text
 *               fullName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               fatherName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               grandFatherName:
 *                 type: string
 *                 required: true
 *                 format: text
 *               province:
 *                 type: string
 *                 required: true
 *                 format: number
 *               division:
 *                 type: string
 *                 required: true
 *                 format: number
 *               district:
 *                 type: string
 *                 required: true
 *                 format: number
 *               engName:
 *                 type: string
 *                 required: true
 *                 format: number
 *               engFatherName:
 *                 type: string
 *                 required: true
 *                 format: number
 *               engGrandFatherName:
 *                 type: string
 *                 required: true
 *                 format: number
 *               educationalYear:
 *                 type: string
 *                 required: true
 *                 format: number
 *               admissionYear:
 *                 type: string
 *                 required: true
 *                 format: number
 *               photo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Student
 *     description: Delete Any Student based on Id.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Student id
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

/**
 * @swagger
 * /students/kankor/{kankorId}:
 *   get:
 *     summary: Get a student
 *     description: get single student based on Id to view his information.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: kankorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kankor id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
