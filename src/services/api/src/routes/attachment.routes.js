const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const attachmentValidation = require('../validations/attachment.validation');
const attachmentController = require('../controllers/attachment.controller');
const upload = require('../middlewares/multer');
const { attachImageToBody } = require('../middlewares/attachFileToBody');

const router = express.Router();

// Create attachment, get, update and delete a attachment
router
  .route('/')
  .post(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(attachmentValidation.createAttachment),
    attachmentController.createAttachment
  );

router.route('/:attachableId').get(auth(), validate(attachmentValidation.getAttachment), attachmentController.getAttachment);

router
  .route('/:attachmentId')
  .patch(
    auth(),
    upload.single('photo'),
    attachImageToBody,
    validate(attachmentValidation.updateAttachment),
    attachmentController.updateAttachment
  )
  .delete(auth(), validate(attachmentValidation.deleteAttachment), attachmentController.deleteAttachment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Attachments
 *   description: Attachments management and retrieval
 */

/**
 * @swagger
 * /attachments/{attachableId}:
 *   get:
 *     summary: Get an attachment
 *     description: get single attachment based on ID.
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: attachableId
 *         required: true
 *         schema:
 *           type: string
 *         description: attachableId
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [shoka, attendance]
 *         description: type of attachment you want to get
 *       - in: query
 *         name: attribute
 *         schema:
 *           type: string
 *         description: additional attribute values. e.g month, chance...
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Attachments'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /attachments:
 *   post:
 *     summary: post an attachment
 *     description: get single attachment based on ID.
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - attachableId
 *             properties:
 *               attachableId:
 *                 type: number
 *                 format: number
 *               type:
 *                 type: string
 *                 enum: [shoka, attendance]
 *                 format: string
 *               attribute:
 *                 type: string
 *                 format: string
 *               photo:
 *                 type: string
 *                 format: binary
 *             example:
 *               attachableId: 1
 *               type: shoka
 *               photo: blob
 *               attribute: 0
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Attachments'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /attachments/{id}:
 *   delete:
 *     summary: Delete attachment
 *     description: Delete an Attachment based on Id.
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: attachmentId
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
 *     summary: Update a Attachment
 *     description: Update a Attachment.
 *     tags: [Attachments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: attachmentId
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *             example:
 *               photo: blob2
 *     responses:
 *       "201":
 *         description: ACCEPtED
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Attachments'
 *
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
