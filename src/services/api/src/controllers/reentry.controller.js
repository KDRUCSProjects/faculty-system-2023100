const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reentryService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const createReentry = catchAsync(async (req, res) => {
  let educationalYearId = null;
  educationalYearId = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
  // if year is created then check if student has been taken the reentry
  if (educationalYearId) {
    const { studentId } = req.body;
    const studentReentry = await reentryService.findReentryByStdIdAndYearId(studentId, educationalYearId);
    if (studentReentry) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has reentry in the same year');
  } else {
    // if year is created then obviously student has not created the reentry in the year 
    educationalYearId = (await educationalYearService.createEducationalYear(req.body.educationalYear))?.id;
    if (!educationalYearId) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'some thing went wrong try again');
  }
  req.body.educationalYearId = educationalYearId;
  const reentry = await reentryService.createReentry(req.body);
  res.status(httpStatus.CREATED).send(reentry);
});

const reentryStudents = catchAsync(async (req, res) => {
  const studentsWithReentry = await reentryService.reentryStudents(req.query);
  res.status(httpStatus.OK).send(studentsWithReentry);
});

const deleteReentry = catchAsync(async (req, res) => {
  const theStudent = await reentryService.deleteReentry(req.params.id);

  res.status(httpStatus.OK).send(theStudent);
});

module.exports = {
  createReentry,
  reentryStudents,
  deleteReentry,
};
