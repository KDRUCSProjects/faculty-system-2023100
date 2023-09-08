const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  studentService,
  educationalYearService,
  taajilService,
  reentryService,
  tabdiliService,
  tokenService,
  studentListService,
  semesterService,
} = require('../services');
const ApiError = require('../utils/ApiError');

const registerStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.body.kankorId);
  if (student) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already created on this Kankor Id');
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
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
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not found');
  const results = await studentService.updateStudent(student, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const getStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');

  let findLatestSemesterId = await studentListService.findStudentLatestSemesterId(student.id);

  let semester = await semesterService.findSemesterById(findLatestSemesterId);

  student.dataValues.latestSemester = semester.title;

  res.status(httpStatus.OK).send(student);
});

const deleteStudent = catchAsync(async (req, res) => {
  const student = await studentService.getStudent(req.params.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  await studentService.deleteStudent(student);
  res.status(httpStatus.NO_CONTENT).send();
});

const getStudents = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  if (req.query.kankorId) {
    const { count, rows } = await studentService.getStudentByKankorId(req.query.kankorId, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows,
    });
  }

  let result = null;

  if (req.query?.status) {
    switch (req.query.status) {
      case 'taajils':
        result = await taajilService.taajilStudents(limit, offset);
        break;
      case 'reentry':
        result = await reentryService.reentryStudents(limit, offset);
        break;
      case 'tabdili':
        result = await tabdiliService.getTabdilis(limit, offset);
        break;
      case 'all':
        result = await studentService.getStudents(limit, offset, req.query.kankorId);
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'invalid query parameters');
    }
  } else {
    const count = (await studentService.countUnregisteredStudent())[0]?.count;
    const result = await studentService.getUnRegisteredStudents(limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: result,
    });
  }
  const { rows, count } = result;
  res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows,
  });
});

const getStudentOnKankorId = catchAsync(async (req, res) => {
  const student = await studentService.getStudentOnKankorId(req.params.kankorId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
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
  if (!userToken) throw new ApiError(httpStatus.BAD_REQUEST, 'Token Not Found');
  req.tempToken = userToken;
  return registerStudent(req, res, next);
});

const getStudentSchool = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const school = await studentService.getStudentSchool(studentId);
  if (!school) throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  return res.status(httpStatus.CREATED).send(school);
});

const createStudentSchool = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const school = await studentService.getStudentSchool(studentId);
  if (school) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has school');
  req.body.studentId = studentId;
  const results = await studentService.createStudentSchool(req.body);
  return res.status(httpStatus.CREATED).send(results);
});

const deleteStudentSchool = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const school = await studentService.getStudentSchool(studentId);
  if (!school) throw new ApiError(httpStatus.NOT_FOUND, 'school not found');
  const onlySchool = await studentService.getSchoolById(school.id);
  await studentService.deleteStudentSchool(onlySchool);
  return res.status(httpStatus.NO_CONTENT).send();
});

const getStudentMonograph = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const monograph = await studentService.getStudentMonograph(studentId);
  if (!monograph) throw new ApiError(httpStatus.NOT_FOUND, 'Monograph not found');
  return res.status(httpStatus.CREATED).send(monograph);
});

const createStudentMonograph = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const monograph = await studentService.getStudentMonograph(studentId);
  if (monograph) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has monograph');
  req.body.studentId = studentId;
  const results = await studentService.createStudentMonograph(req.body);
  return res.status(httpStatus.CREATED).send(results);
});

const deleteStudentMonograph = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const monograph = await studentService.getStudentMonograph(studentId);
  if (!monograph) throw new ApiError(httpStatus.NOT_FOUND, 'monograph not found');
  const onlyMonograph = await studentService.getMonographById(monograph.id);
  await studentService.deleteStudentMonograph(onlyMonograph);
  return res.status(httpStatus.NO_CONTENT).send();
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
  getStudentSchool,
  createStudentSchool,
  deleteStudentSchool,
  getStudentMonograph,
  createStudentMonograph,
  deleteStudentMonograph,
};
