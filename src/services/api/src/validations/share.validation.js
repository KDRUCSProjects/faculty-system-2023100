const Joi = require('joi');

const paginate = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    skip: Joi.number(),
  }),
};

const deleteBunch = {
  body: Joi.array().items(Joi.number().min(1)).min(1),
};

module.exports = {
  paginate,
  deleteBunch,
};
