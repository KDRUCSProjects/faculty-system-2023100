const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, subjectService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  if (req.query.all) {
    let result = await userService.allUsers();
    return res.status(httpStatus.OK).send(result);
  }
  if (req.query.assistants) {
    let result = await userService.systemUsers();
    return res.status(httpStatus.OK).send(result);
  }
  // Default teachers only
  const result = await userService.queryUsers();
  res.status(httpStatus.OK).send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  const results = await userService.updateUserById(user, req.body);
  return res.status(httpStatus.OK).send(results);
});

const deleteUser = catchAsync(async (req, res) => {
  const teacher = await userService.getTeacher(req.params.userId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  const teacherSubjects = await subjectService.getTeacherSubjects(req.params.userId);
  if (teacherSubjects.length >= 1) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Teacher Has Subjects');
  await userService.deleteUserById(req.params.userId);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
