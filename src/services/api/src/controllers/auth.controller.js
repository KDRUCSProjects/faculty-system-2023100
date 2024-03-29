const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const changePassword = catchAsync(async (req, res) => {
  const doMatch = await userService.verifyEmailAndPassword(req.user, req.body.currentPassword);
  if (!doMatch) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'incorrect password');
  req.user.password = req.body.newPassword;
  const results = await userService.updateUser(req.user);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const updateProfile = catchAsync(async (req, res) => {
  const results = await userService.updateUserById(req.user, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const checkPassword = catchAsync(async (req, res) => {
  const { password } = req.body;
  const results = await userService.verifyEmailAndPassword(req.user, password);
  if (results) return res.status(httpStatus.OK).send();
  throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized');
});

const createTemporaryToken = catchAsync(async (req, res) => {
  const token = await tokenService.createTemporaryToken();
  return res.status(httpStatus.CREATED).send(token);
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  resetPassword,
  changePassword,
  updateProfile,
  checkPassword,
  createTemporaryToken,
};
