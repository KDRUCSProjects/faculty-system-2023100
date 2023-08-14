const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { badliAshaValidation } = require('../validations');
const { badliAshaController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('manageDepartments'), validate(badliAshaValidation.createFile), badliAshaController.createBadliAshaFile);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: BadliAsha
 *   description: BadliAsha management and retrieval
 */

/**
 * @swagger
 * /badliAsha:
 *   get:
 *     summary: create badliAsha file in excel.
 *     description: create badliAsha file in excel.
 *     tags: [BadliAsha]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: number
 *         description: year
 *       - in: query
 *         name: classTitle
 *         required: true
 *         schema:
 *           type: number
 *         description: classTitle
 *     responses:
 *       "200":
 *         description: NO CONTENT AND FILE WILL BE DOWNLOADED
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
