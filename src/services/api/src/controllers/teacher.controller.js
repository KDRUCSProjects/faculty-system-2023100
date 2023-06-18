const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { teacherService } = require('../services');

const getTeachers = catchAsync(async (req, res) => {
  const results = await teacherService.getTeachers();
  return res.status(httpStatus.OK).send(results);
});

module.exports = {
  getTeachers,
};
