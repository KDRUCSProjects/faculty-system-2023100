const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)) {
    return helpers.message(
      'Password Must have One uppercase, one lowercase, one number, one special character and Minimum 8 digit'
    );
  }
  return value;
};

module.exports = {
  objectId,
  password,
};
