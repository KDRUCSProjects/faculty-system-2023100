// Sequelize Models
const httpStatus = require('http-status');
const { Attachment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create an atttachment
 * @param {Object} AttachmentBody
 * @returns {Promise<Attachment>}
 */
const createAttachment = (AttachmentBody) => {
  return Attachment.create(AttachmentBody);
};

/**
 * Get attachment by id
 * @param {ObjectId} id
 * @returns {Promise<Attachment>}
 */
const getAttachmentById = async (id) => {
  return Attachment.findOne({ where: { id } });
};

/**
 * Get attachment by id
 * @param {ObjectId} id
 * @returns {Promise<Attachment>}
 */
const getAttachmentByAttachableId = async (id) => {
  return Attachment.findOne({ where: { attachableId: id } });
};

/**
 * Get attachment by id
 * @param {ObjectId} id
 * @returns {Promise<Attachment>}
 */
const getAttachmentByAttachableIdAndType = async (id, type) => {
  return Attachment.findOne({ where: { attachableId: id, type } });
};

/**
 * delete Attachment
 * @param {Object} attachment
 * @returns {Promise<Attachment>}
 */
const deleteAttachment = (attachment) => {
  if (attachment instanceof Attachment) return attachment.destroy();
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * update Attachment
 * @param {Object} oldAttachment
 * @param {Object} newAttachment
 * @returns {Promise<Attachment>}
 */
const updateAttachment = (oldAttachment, newAttachment) => {
  if (oldAttachment instanceof Attachment) {
    oldAttachment.set({
      ...newAttachment,
    });
    return oldAttachment.save();
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

module.exports = {
  createAttachment,
  deleteAttachment,
  updateAttachment,
  getAttachmentByAttachableId,
  deleteAttachment,
  getAttachmentById,
  getAttachmentByAttachableIdAndType,
};
