const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const departmentValidation = require('../validations/department.validation');
const departmentController = require('../controllers/department.controller');

const router = express.Router();

// Create department, get, update and delete a department
router
  .route('/')
  .post(auth('manageDepartments'), validate(departmentValidation.createDepartment), departmentController.createDepartment);

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
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateDepartment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
