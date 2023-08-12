const express = require('express');
const validate = require('../middlewares/validate');
const { studentValidation, shareValidation } = require('../validations');
const { studentController } = require('../controllers');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const { attachImageToBody } = require('../middlewares/attachFileToBody');

const router = express.Router();

router
  .route('/')
  .get(auth(), validate(shareValidation.paginate), studentController.getStudents)
  .delete(auth(), validate(studentValidation.deleteStudents), studentController.deleteStudents)
  .post(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(studentValidation.registerStudent),
    studentController.registerStudent
  );

router
  .route('/students/:token')
  .post(
    upload.single('photo'),
    attachImageToBody,
    validate(studentValidation.tempToken),
    studentController.registerYourSelf
  );

router
  .route('/:studentId')
  .get(auth(), validate(studentValidation.getStudent), studentController.getStudent)
  .delete(auth(), validate(studentValidation.getStudent), studentController.deleteStudent)
  .patch(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(studentValidation.updateStudent),
    studentController.updateStudent
  );

router.route('/kankor/:kankorId').get(validate(studentValidation.kankor), studentController.getStudentOnKankorId);

router
  .route('/:studentId/school')
  .get(auth('manageUsers'), validate(studentValidation.getStudent), studentController.getStudentSchool)
  .post(auth('manageUsers'), validate(studentValidation.createStudentSchool), studentController.createStudentSchool)
  .delete(auth('manageUsers'), validate(studentValidation.getStudent), studentController.deleteStudentSchool);


router
  .route('/:studentId/monograph')
  .get(auth('manageUsers'), validate(studentValidation.getStudent), studentController.getStudentMonograph)
  .post(auth('manageUsers'), validate(studentValidation.createStudentMonograph), studentController.createStudentMonograph)
  .delete(auth('manageUsers'), validate(studentValidation.getStudent), studentController.deleteStudentMonograph);

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
 *      - name: status
 *        in: query
 *        description: student status 'taajils', 'reentry', 'tabdili', 'reserve'
 *        schema:
 *          type: string
 *          example: taajils
 *      - name: limit
 *        in: query
 *        schema:
 *          type: number
 *          example: 10
 *        description: limit and default limit is 2000
 *      - name: kankorId
 *        in: query
 *        schema:
 *          type: string
 *        description: search by kankor id
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
 *               gender:
 *                 type: string
 *                 enum: [male, female]
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
 *                 format: text
 *               fullName:
 *                 type: string
 *                 format: text
 *               fatherName:
 *                 type: string
 *                 format: text
 *               grandFatherName:
 *                 type: string
 *                 format: text
 *               province:
 *                 type: string
 *                 format: number
 *               division:
 *                 type: string
 *                 format: number
 *               district:
 *                 type: string
 *                 format: number
 *               engName:
 *                 type: string
 *                 format: text
 *               engLastName:
 *                 type: string
 *                 format: text
 *               engFatherName:
 *                 type: string
 *                 format: text
 *               engGrandFatherName:
 *                 type: string
 *                 format: text
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-25"
 *                 description: 'please select date using date picker'
 *               educationalYear:
 *                 type: string
 *                 format: number
 *               admissionYear:
 *                 type: string
 *                 format: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               tazkeraNumber:
 *                 type: string
 *               birthCity:
 *                 type: string
 *               birthCountry:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               kankorMarks:
 *                 type: number
 *               kankorType:
 *                 type: string
 *               birthCityEnglish:
 *                 type: string
 *               birthCountryEnglish:
 *                 type: string
 *               bankAccount:
 *                 type: string
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

/**
 * @swagger
 * /students/students/{token}:
 *   post:
 *     summary: Register Student By His Self
 *     description: Register Student By His Self.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: temporary token
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - kankorId
 *               - fullName
 *               - fatherName
 *               - grandFatherName
 *               - educationalYear
 *             properties:
 *               kankorId:
 *                 type: string
 *                 format: text
 *               fullName:
 *                 type: string
 *                 format: text
 *               fatherName:
 *                 type: string
 *                 format: text
 *               grandFatherName:
 *                 type: string
 *                 format: text
 *               province:
 *                 type: string
 *                 format: number
 *               division:
 *                 type: string
 *                 format: number
 *               district:
 *                 type: string
 *                 format: number
 *               engName:
 *                 type: string
 *                 format: text
 *               engLastName:
 *                 type: string
 *                 format: text
 *               engFatherName:
 *                 type: string
 *                 format: text
 *               engGrandFatherName:
 *                 type: string
 *                 format: text
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "2023-06-25"
 *                 description: 'please select date using date picker'
 *               educationalYear:
 *                 type: string
 *                 format: number
 *               admissionYear:
 *                 type: string
 *                 format: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               tazkeraNumber:
 *                 type: string
 *               birthCity:
 *                 type: string
 *               birthCountry:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               kankorMarks:
 *                 type: number
 *               kankorType:
 *                 type: string
 *               birthCityEnglish:
 *                 type: string
 *               birthCountryEnglish:
 *                 type: string
 *               bankAccount:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Student'
 *       "404":
 *         $ref: '#/components/responses/TokenNotFound'
 *       "406":
 *         $ref: '#/components/responses/TokenExpired'
 */



/**
 * @swagger
 * /students/{studentId}/school:
 *   get:
 *     summary: Get a student school
 *     description: get single student based on Id to view his information.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/School'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   post:
 *     summary: create student school
 *     description: create student school.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               graduationDate:
 *                 type: date
 *             example:
 *               name: Ahmad Shah Baba High School
 *               graduationDate: 2023-07-29
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/School'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     summary: delete a student school
 *     description: delete a student school.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     responses:
 *       "200":
 *         description: NO CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */


/**
 * @swagger
 * /students/{studentId}/monograph:
 *   get:
 *     summary: Get a student monograph
 *     description: get a student monograph.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Monograph'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   post:
 *     summary: create student Monograph
 *     description: create student Monograph.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               researchTitle:
 *                 type: string
 *               defenseDate:
 *                 type: date
 *             example:
 *               researchTitle: Afghanistan Internet
 *               defenseDate: 2023-07-29
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Monograph'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 * 
 *   delete:
 *     summary: delete a student Monograph
 *     description: delete a student Monograph.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: student id
 *     responses:
 *       "200":
 *         description: NO CONTENT
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */