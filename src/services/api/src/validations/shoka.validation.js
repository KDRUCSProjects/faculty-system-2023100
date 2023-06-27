const Joi = require('joi');

const getShoka = {
  params: Joi.object().keys({
    shokaId: Joi.number().required(),
  }),
};

const getShokaBySubjectId = {
  params: Joi.object().keys({
    subjectId: Joi.number().required(),
  }),
};
module.exports = {
  getShoka,
  getShokaBySubjectId,
};
