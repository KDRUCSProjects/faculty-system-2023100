const Joi = require('joi');

const createAttachment = {
  body: Joi.object().keys({
    attachableId: Joi.number().required(),
    type: Joi.string().valid('shoka', 'attendance'),
    photo: Joi.string().required('photo is required'),
  }),
};

const getAttachment = {
  params: Joi.object().keys({
    attachableId: Joi.number().required(),
  }),
};

const updateAttachment = {
  params: Joi.object().keys({
    attachmentId: Joi.number().required(),
  }),
  body: Joi.object().keys({
    photo: Joi.string().allow(null).allow(''),
  }),
};

const deleteAttachment = {
  params: Joi.object().keys({
    attachmentId: Joi.number().required(),
  }),
};

module.exports = {
  getAttachment,
  createAttachment,
  updateAttachment,
  deleteAttachment,
};
