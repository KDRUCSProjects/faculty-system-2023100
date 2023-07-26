const httpStatus = require('http-status');
const i18n = require('i18n');
const catchAsync = require('../utils/catchAsync');
const { studentService, educationalYearService, taajilService, reentryService, tabdiliService, tokenService } = require('../services');
const ApiError = require('../utils/ApiError');

const registerStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.body.kankorId);
  if (student) throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('studnetAlreadyTakenKankorId'));
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear)
  let educationalYearId;
  if (year) {
    educationalYearId = year;
  } else {
    educationalYearId = (await educationalYearService.createEducationalYear(req.body.educationalYear))?.id;
  }
  const results = await studentService.registerStudent({
    ...req.body,
    educationalYearId,
  });
  if (req.tempToken) {
    await tokenService.deleteTemporaryToken(req.tempToken);
  }
  return res.status(httpStatus.CREATED).send(results);
});

const updateStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('Student Not found'));
  const results = await studentService.updateStudent(student, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('studentNotFound'));
  res.status(httpStatus.OK).send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('studentNotFound'));
  await studentService.deleteStudent(student);
  res.status(httpStatus.NO_CONTENT).send();
});

const getStudents = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt(((page - 1) * limit), 10);

  if (req.query.kankorId) {
    const { count, rows } = await studentService.getStudentByKankorId(req.query.kankorId, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows
    });
  }

  let result = null;

  if (req.query?.status) {
    switch (req.query.status) {
      case 'taajils':
        result = await taajilService.taajilStudents(limit, offset);
        break;
      case 'reentry':
        result = await reentryService.reentryStudents(limit, offset)
        break;
      case 'tabdili':
        result = await tabdiliService.getTabdilis(limit, offset);
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, i18n.__('invalidParameters'));
    }
  } else {
    const count = (await studentService.countUnregisteredStudent())[0]?.count;
    const result = await studentService.getUnRegisteredStudents(limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: result
    });
  }
  const { rows, count } = result;
  res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows
  });
});

const getStudentOnKankorId = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.params.kankorId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('studentNotFound'));
  res.status(httpStatus.OK).send(student);
});

const deleteStudents = catchAsync(async (req, res) => {
  let results = [];
  for await (const std of req.body) {
    const result = await studentService.deleteStudentById(std.studentId);
    results.push(result);
  }
  res.status(httpStatus.OK).send(results);
});

const registerYourSelf = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const userToken = await tokenService.getTempToken(token);
  if (!userToken) throw new ApiError(httpStatus.BAD_REQUEST, i18n.__('tokenNotFound'));
  req.tempToken = userToken;
  return registerStudent(req, res, next);
});



module.exports = {
  getStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  deleteStudents,
  registerStudent,
  registerYourSelf,
  getStudentOnKankorId,
};
