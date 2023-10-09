const express = require('express');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const { transcriptValidation } = require('../validations');
const { transcriptController } = require('../controllers');

const router = express.Router();

router
  .route('/:studentId')
  .get(auth('transcript'), validate(transcriptValidation.createFile), transcriptController.createTranscript);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Transcript
 *   description: Transcript management and retrieval
 */

/**
 * @swagger
 * /transcript/{studentId}:
 *   get:
 *     summary: create Transcript file in excel.
 *     description: create Transcript file in excel.
 *     tags: [Transcript]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentId
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
