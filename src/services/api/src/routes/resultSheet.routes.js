const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { resultSheetValidation } = require('../validations');
const { resultSheetController } = require('../controllers');

const router = express.Router();

router.route('/:period').get(validate(resultSheetValidation.createFile), resultSheetController.createResultSheet);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ResultSheet
 *   description: ResultSheet management and retrieval
 */

/**
 * @swagger
 * /resultSheet/{period}:
 *   get:
 *     summary: create ResultSheet file in excel.
 *     description: create ResultSheet file in excel.
 *     tags: [ResultSheet]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: period
 *         required: true
 *         schema:
 *           type: number
 *         description: student id
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
