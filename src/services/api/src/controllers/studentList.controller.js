const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService, semesterService, studentListService, taajilService, tabdiliService, educationalYearService } = require('../services');
const ApiError = require('../utils/ApiError');

const createStudentList = catchAsync(async (req, res) => {
  const { studentId, semesterId } = req.body;
  /** check if the student id is correct */
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');

  /** check if tabdily has been given to the student */
  const studentTabdili = await tabdiliService.findTabdiliByStudentId(studentId);
  if (studentTabdili) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has got tabdili');

  /** find student all student lists */
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  /** if student has not registered to any semester we will give reentry */
  if (studentList.length >= 1) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is Already Enrolled in a semester');
  /** check semester id if it is correct */
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');

  /** check if the semester title is one */
  if (semester.title !== 1) throw new ApiError(httpStatus.ACCEPTED, `${semesterId} is not first semester's id`);

  const result = await studentListService.createStudentList(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

const getStudentLists = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt(((page - 1) * limit), 10);

  // check if semester id exists
  if (req.query?.semesterId) {
    const { semesterId } = req.query;
    const semester = await semesterService.findSemesterById(semesterId);
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
    const queryArray = [`student.deletedAt IS NULL`, `semester.id = ${semesterId}`];
    const count = (await studentListService.countStudentList(queryArray))[0]?.count;
    const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: results
    });
  }

  if (!req.query?.year) {
    const queryArray = [`student.deletedAt IS NULL`];
    const count = (await studentListService.countStudentList(queryArray))[0]?.count;
    const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: results
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

const promoteStudents = catchAsync(async (req, res) => {
  const results = [];

  for await (const studentId of req.body) {
    let semesterYear = nextSemester = lastSemester = nextYear = result = null;

    const studentAllLists = await studentListService.findAllStudentListOfSingleStudent(studentId);
    if (studentAllLists.length >= 1 && studentAllLists.length < 10) {
      lastSemester = await semesterService.findSemesterById(studentAllLists[0].semesterId);
      if (lastSemester.title === 8) {
        if (!lastSemester.onGoing) {
          result = await studentListService.updatedStudentList(studentAllLists[0], { 'onGoing': false, 'completed': true });
        }
        results.push({ message: 'Student is Graduated', result });
        continue;
      }
      semesterYear = await educationalYearService.getEducationalYear(lastSemester.educationalYearId);
      if (lastSemester.title % 2 === 0) {
        nextYear = await educationalYearService.findNextYear(semesterYear.year);
        if (!nextYear) {
          nextYear = await educationalYearService.createNextEducationalYear(semesterYear.year);
        }
        nextSemester = await semesterService.findNextSemester(nextYear.id, lastSemester.title);
        await studentListService.updatedStudentList(studentAllLists[0], { 'onGoing': false, 'completed': true });
        result = await studentListService.createStudentList({ studentId, semesterId: nextSemester.id });
        results.push(result);
      } else {
        nextSemester = await semesterService.findNextSemester(semesterYear.id, lastSemester.title);
        await studentListService.updatedStudentList(studentAllLists[0], { 'onGoing': false, 'completed': true });
        result = await studentListService.createStudentList({ studentId, semesterId: nextSemester.id });
        results.push(result);
      }
    } else {
      results.push({ studentId, message: 'student does not have enrollment in first semester' });
    }
  }
  return res.status(httpStatus.OK).send(results);
});


module.exports = {
  deleteBunch,
  getStudentLists,
  deleteStudentList,
  createStudentList,
  promoteStudents,
};
