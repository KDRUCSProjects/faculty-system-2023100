const httpStatus = require('http-status');
const i18n = require('i18n');
const catchAsync = require('../utils/catchAsync');
const { shokaService, subjectService } = require('../services');
const ApiError = require('../utils/ApiError');

const getShokas = catchAsync(async (req, res) => {
  const results = await shokaService.getShokas();
  return res.status(httpStatus.OK).send(results);
});

const getShoka = catchAsync(async (req, res) => {
  const shoka = await shokaService.findShokaById(req.params.shokaId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('shoka.get.notFound'));
  return res.status(httpStatus.OK).send(shoka);
});

const getShokaBySubjectId = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('shoka.getBySubjectId.subjectNotFound'));
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND,i18n.__('shoka.getBySubjectId.shokaNotFound'));
  return res.status(httpStatus.OK).send(shoka);
});

module.exports = {
  getShoka,
  getShokas,
  getShokaBySubjectId,
};
