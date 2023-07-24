const express = require('express');
const { createUser } = require('../controllers/firstUser.controller');
const validate = require('../middlewares/validate');
const { firstUserValidation,  } = require('../validations');
const router = express.Router();

// Route for creating users
router.post('/',validate(firstUserValidation.validatefirstUsers), createUser);

module.exports = router;





/**
 * @swagger
 * tags:
 *   name: first_User
 *   description: first User setup 
 */

/**
 * @swagger
 * /first_users:
 *   post:
 *     summary: Create first user
 *     description: Only admins can create other users.
 *     tags: [first_User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accounts
 *               - currentEducationalYear
 *     properties:
 *      accounts:
 *           type: array
 *                items:
 *                    type: object
 *                    required:
 *                      - name
 *                      - email
 *                      - password
 *                      - role
 *                    properties:
 *                      name:
 *                        type: string
 *                      email:
 *                        type: string
 *                      password:
 *                       type: string
 *                      role:
 *                       type: string
 *           example:
 *               accounts:
 *                 - name: fake name
 *                   email: fake@example.com
 *                   password: password1
 *                   role: user
 *                 - name: fake name
 *                   email: fake@example.com
 *                   password: password1
 *                   role: user
 *                 - name: fake name
 *                   email: fake@example.com
 *                   password: password1
 *                   role: user
 *               currentEducationalYear: 2019
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

