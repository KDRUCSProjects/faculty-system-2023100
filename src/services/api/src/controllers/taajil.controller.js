const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  taajilService,
  educationalYearService,
  studentService,
  studentListService } = require('../services');

const createTaajil = catchAsync(async (req, res) => {
  const { studentId, educationalYear } = req.body;
  // check student if the id of student is correct
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  // find all student list of single student by student id
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  if (studentList.length <= 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You Need To add the student to a semester');
  // find all taajils of single student 
  const studentAllTajils = await taajilService.findStudentAllTajils(studentId);
  if (studentAllTajils.length >= 2) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student has Two Taajils. And Can not get more than two Taajils');
  // check if student previous semester was not on going OR student previous Taajil was on Going 
  if (!studentList[0].onGoing || studentAllTajils[0]?.onGoing) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student has active Taajil. Student Needs Reentry first');
  // check year. if year is correct. That is clear that we don't give taajils in the past or future years;
  const currentYear = await educationalYearService.getCurrentEducationalYear();
  if (currentYear?.year !== educationalYear) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Year is Incorrect');
  // stop student current semester
  await studentListService.updatedStudentList(studentList[0], { 'onGoing': false });
  // create new Taajil
  req.body.educationalYearId = currentYear.id;
  const taajil = await taajilService.createTaajil(req.body);
  return res.status(httpStatus.CREATED).send(taajil);
});

const taajilStudents = catchAsync(async (req, res) => {

  if (req.query?.studentId) {
    const { studentId } = req.query;
    const results = await taajilService.findTaajilByStudentId(studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Taajil Not Found With Student id ${studentId}`);
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.taajilId) {
    const { taajilId } = req.query;
    const results = await taajilService.findTaajilById(taajilId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Taajil Not Found wint id ${taajilId}`);
    return res.status(httpStatus.OK).send(results);
  } else if (req.query?.kankorId) {
    const { kankorId } = req.query;
    const results = await taajilService.findTaajilByStdKankorId(kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Taajil Not Found Student With Kankor id ${kankorId}`);
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
