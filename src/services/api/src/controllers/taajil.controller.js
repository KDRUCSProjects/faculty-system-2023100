const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { taajilService, educationalYearService, studentService } = require('../services');

const createTaajil = catchAsync(async (req, res) => {
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Year Not Found');
  const student = await studentService.getStudent(req.body.studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const studentTaajil = await taajilService.findTaajilByStudentId(req.body.studentId);
  if (studentTaajil) throw new ApiError(httpStatus.BAD_REQUEST, 'student already has taajil');
  req.body.educationalYearId = year;
  const taajil = await taajilService.createTaajil(req.body);
  res.status(httpStatus.CREATED).send(taajil);
});

const taajilStudents = catchAsync(async (req, res) => {

  if (req.query?.studentId) {
    const results = await taajilService.findTaajilByStudentId(req.query.studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found With Student id');
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.taajilId) {
    const results = await taajilService.findTaajilById(req.query.taajilId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found');
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.kankorId) {
    const results = await taajilService.findTaajilByStdKankorId(req.query.kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found Student With Kankor id');
    return res.status(httpStatus.OK).send(results);
  }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 10;
  const offset = parseInt(((page - 1) * limit), 10);

  if (req.query?.educationalYear) {
    const educationalYearId = await educationalYearService.findEducationalYearByValue(req.query.educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, 'educationalYear not found');
    const { count, rows } = await taajilService.findTaajilsByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows
    });
  }


  const { count, rows } = await taajilService.taajilStudents(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows
  });
});


const getTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found');
  return res.status(httpStatus.OK).send(taajil);
});

const updateTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found');
  const results = await taajilService.updateTaajil(taajil, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});


const deleteTaajil = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilByStudentId(req.params.studentId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found');
  await taajilService.deleteTaajil(taajil);
  res.status(httpStatus.NO_CONTENT).send();
});


const deleteTaajilById = catchAsync(async (req, res) => {
  const taajil = await taajilService.findTaajilById(req.params.taajilId);
  if (!taajil) throw new ApiError(httpStatus.NOT_FOUND, 'Taajil Not Found');
  await taajilService.deleteTaajil(taajil);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getTaajil,
  createTaajil,
  deleteTaajil,
  updateTaajil,
  taajilStudents,
  deleteTaajilById,
};
