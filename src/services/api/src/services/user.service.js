const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// Sequelize Models
const { User } = require('../models');
const { __ } = require('i18n');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, __('users.emailAlreadyTaken'));
  }
  return User.create(userBody);
};

/**
 * get all users(teachers)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = () => {
  return User.findAll({ where: { role: 'user' }, order: [['createdAt', 'ASC']] });
};

/**
 * get all users teachers + assistants
 * @returns {Promise<QueryResult>}
 */
const allUsers = () => {
  return User.findAll({ where: { role: ['user', 'execManager', 'teachingManager'] }, order: [['createdAt', 'ASC']] });
};

/**
 * get system users
 * @returns {Promise<QueryResult>}
 */
const systemUsers = () => {
  return User.findAll({ where: { role: ['execManager', 'teachingManager'] }, order: [['createdAt', 'ASC']] });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findOne({ where: { id } });
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = (email) => {
  return User.findOne({ where: { email } });
};

/**
 * Update user by id
 * @param {Object} oldUser
 * @param {Object} newUserBody
 * @returns {Promise<User>}
 */
const updateUserById = (oldUser, newUserBody) => {
  // delete password attribute so that it will not be hashed
  delete oldUser?.dataValues?.password;
  delete oldUser?._previousDataValues?.password;

  // save other fields
  if (oldUser instanceof User) {
    return oldUser.update({ ...oldUser, ...newUserBody });
  }
  throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'something went wrong');
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

/**
 * Verify Email and Password
 * @param {Object} User
 * @param {password} string
 * @returns {Promise<Object>}
 */
const verifyEmailAndPassword = (reqUser, password) => {
  return reqUser.isPasswordMatch(password);
};

/**
 * update user
 * @param {Object} userBody
 * @returns {Promise<Object>}
 */
const updateUser = (userBody) => {
  return userBody.save(userBody);
};

/**
 * get teacher
 * @param {ObjectId} teacherId
 * @returns {Promise<Object>}
 */
const getTeacher = (teacherId) => {
  return User.findOne({ where: { id: teacherId, role: 'user' } });
};
module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  verifyEmailAndPassword,
  updateUser,
  getTeacher,
  systemUsers,
  allUsers,
};
