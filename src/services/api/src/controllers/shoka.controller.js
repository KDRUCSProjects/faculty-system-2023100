const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shokaService, subjectService } = require('../services');
const ApiError = require('../utils/ApiError');

const getShokas = catchAsync(async (req, res) => {
  const results = await shokaService.getShokas();
  return res.status(httpStatus.OK).send(results);
});

const getShoka = catchAsync(async (req, res) => {
  const shoka = await shokaService.findShokaById(req.params.shokaId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  return res.status(httpStatus.OK).send(shoka);
});

const getShokaBySubjectId = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  return res.status(httpStatus.OK).send(shoka);
});

module.exports = {
  getShoka,
  getShokas,
  getShokaBySubjectId,
};
