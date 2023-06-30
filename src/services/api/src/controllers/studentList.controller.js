const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService, semesterService, studentListService, taajilService, tabdiliService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const createStudentList = catchAsync(async (req, res) => {
  const { studentId, semesterId } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const studentList = await studentListService.findListedStudentByStudentId(studentId);
  if (studentList) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student already exists in a semester');
  const studentTajil = await taajilService.findTaajilByStudentId(studentId);
  if (studentTajil) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has tajil');
  const studentTabdili = await tabdiliService.findTabdiliByStudentId(studentId);
  if (studentTabdili) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has got tabdili');
  const result = await studentListService.createStudentList(req.body);
  return res.send(result);
});

const getStudentLists = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 10;
  const offset = parseInt(((page - 1) * limit), 10);

  if (!req.query?.year) {
    const { rows, count } = await studentListService.getStudentLists(limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows
    });
  }

  if (req.query?.year) {
    const year = await educationalYearService.findEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  }
  const { year } = req.query;

  // create an query object //
  const queryArray = [`year.year = ${year}`, `student.deletedAt IS NULL`]

  if (req.query?.semester) {
    queryArray.push(`semester.title = ${req.query.semester}`);
    const count = (await studentListService.countStudentList(queryArray))[0]?.count;
    const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: results
    });
  }

  if (req.query?.class) {
    const classTitle = req.query.class;
    switch (classTitle) {
      case 1:
        queryArray.push(`(semester.title = 1 OR semester.title = 2)`)
        break;
      case 2:
        queryArray.push(`(semester.title = 3 OR semester.title = 4)`);
        break;
      case 3:
        queryArray.push(`(semester.title = 5 OR semester.title = 6)`)
        break;
      case 4:
        queryArray.push(`(semester.title = 7 OR semester.title = 8)`)
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
    }
  }
  const count = (await studentListService.countStudentList(queryArray))[0]?.count;
  console.log({ count, limit, offset })
  const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: results
  });
});

const deleteStudentList = catchAsync(async (req, res) => {
  const studentList = await studentListService.findStudentListById(req.params.studentListId);
  if (!studentList) throw new ApiError(httpStatus.NOT_FOUND, 'student list not found');
  await studentListService.deleteStudentList(studentList);
  return res.status(httpStatus.NO_CONTENT).send();
});

const deleteBunch = catchAsync(async (req, res) => {
  const results = [];
  for await (const studentListId of req.body) {
    const studentList = await studentListService.findStudentListById(studentListId);
    if (studentList) {
      const result = await studentListService.deleteStudentList(studentList);
      results.push(result);
    }
  }
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  deleteBunch,
  getStudentLists,
  deleteStudentList,
  createStudentList,
};
