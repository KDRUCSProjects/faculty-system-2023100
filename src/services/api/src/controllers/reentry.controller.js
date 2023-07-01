const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { reentryService, educationalYearService, studentService, taajilService } = require('../services');
const ApiError = require('../utils/ApiError');

const createReentry = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.body.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
  let educationalYearId = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
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

  if (req.query?.studentId) {
    const results = await reentryService.findReentryByStudentId(req.query.studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Reentry Not Found With Student id');
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.reentryId) {
    const results = await reentryService.findReentryById(req.query.reentryId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Reentry Not Found');
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.kankorId) {
    const results = await reentryService.findReentryByStdKankorId(req.query.kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Reentry Not Found With Student Kankor id');
    return res.status(httpStatus.OK).send(results);
  }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 10;
  const offset = parseInt(((page - 1) * limit), 10);

  if (req.query?.educationalYear) {
    const educationalYearId = await educationalYearService.findEducationalYearByValue(req.query.educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, 'educationalYear not found');
    const { count, rows } = await reentryService.findReentriesByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows
    });
  }


  const { count, rows } = await reentryService.reentryStudents(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows
  });
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
