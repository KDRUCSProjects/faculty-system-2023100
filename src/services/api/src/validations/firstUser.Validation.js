const Joi = require('joi');

// Joi schema for user data validation
const userSchema = Joi.object({
  role: Joi.string().valid('admin', 'execManager', 'teachingManager').required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required(),
});

// Function to validate user data
function validateUser(user) {
  return userSchema.validate(user);
}

module.exports = { validateUser };
