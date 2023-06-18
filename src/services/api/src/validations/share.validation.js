const Joi = require('joi');

const paginate = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    skip: Joi.number(),
  }),
};

module.exports = {
  paginate,
};
