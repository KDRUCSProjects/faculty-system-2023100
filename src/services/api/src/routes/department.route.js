const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const departmentValidation = require('../validations/department.validation');
const departmentController = require('../controllers/department.controller');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .get(auth('manageDepartments'), departmentController.getDepartments)
  .post(auth('manageDepartments'), validate(departmentValidation.createDepartment), departmentController.createDepartment);

router
  .route('/:departmentId')
  .get(auth('manageDepartments'), validate(departmentValidation.getDepartment), departmentController.getDepartment)
  .patch(auth('manageDepartments'), validate(departmentValidation.getDepartment), departmentController.updateDepartment)
  .delete(auth('manageDepartments'), validate(departmentValidation.getDepartment), departmentController.deleteDepartment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Departments management and retrieval
 */

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: get all Departments
 *     description: Get All Departments.
 *     tags: [Departments]
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
 *                 $ref: '#/components/schemas/Departments'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *   post:
 *     summary: Create a department
 *     description: Add a new department of a faculty.
 *     tags: [Departments]
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
 *             example:
 *               name: General
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departments'
 *       "400":
 *         $ref: '#/components/responses/DuplicateDepartment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'

 */

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get a department
 *     description: get single department based on ID.
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: departmentId
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departments'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a Department
 *     description: Delete an Department based on Id.
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: departmentId`
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a Department
 *     description: Update a Department.
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: departmentId
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
 *             example:
 *               name: IT
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Departments'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
