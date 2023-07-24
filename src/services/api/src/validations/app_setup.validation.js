
const Joi = require('joi');

// Joi schema for user data validation
 
const firstUserSchema = Joi.object({
  accounts: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),
      role: Joi.string().valid('admin', 'execManager', 'teachingManager').required(),
    })
  ).min(1).required(),
  currentEducationalYear: Joi.number().required()
});

// Function to validate user data
function validatefirstUsers(user) {
  return firstUserSchema.validate(user);
}

module.exports = { validatefirstUsers };
