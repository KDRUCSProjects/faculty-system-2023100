const httpStatus = require('http-status');
const i18n = require('i18n');
const catchAsync = require('../utils/catchAsync');
const {
  studentService,
  semesterService,
  studentListService,
  taajilService,
  tabdiliService,
  educationalYearService,
} = require('../services');
const ApiError = require('../utils/ApiError');
const { checkStudentEligibilityForNextSemester, findEligibleNextSemester } = require('../utils/global');

const createStudentList = catchAsync(async (req, res) => {
  const { studentId, semesterId } = req.body;
  /** check if the student id is correct */
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('studentNotFound'));

  // First, check if student kankor year matches current on-going year
  const currentEduYear = (await educationalYearService.getCurrentEducationalYear())?.year;
  const studentKankorYear = (await educationalYearService.getEducationalYear(student.educationalYearId))?.year;

  if (studentKankorYear !== currentEduYear)
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('enrollmentNotAllowed', { studentKankorYear }));

  /** check if tabdily has been given to the student */
  const studentTabdili = await tabdiliService.findTabdiliByStudentId(studentId);
  if (studentTabdili) throw new ApiError(httpStatus.NOT_ACCEPTABLE, i18n.__('studentHasTabdili'));

  /** find student all student lists */
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  /** if student has not registered to any semester we will give reentry */
  if (studentList.length >= 1) throw new ApiError(httpStatus.NOT_ACCEPTABLE,  i18n.__('studentAlreadyEnrolled'));
  /** check semester id if it is correct */
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('semesterNotFound'));

  /** check if the semester title is one */
  if (semester.title !== 1) throw new ApiError(httpStatus.ACCEPTED, i18n.__('onlyEnrollFirstSemester'));

  const result = await studentListService.createStudentList(req.body);
  return res.status(httpStatus.CREATED).send(result);
});

const getStudentLists = catchAsync(async (req, res) => {
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  // check if semester id exists
  if (req.query?.semesterId) {
    const { semesterId } = req.query;
    const semester = await semesterService.findSemesterById(semesterId);
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('semesterNotFound'));
    const queryArray = [`student.deletedAt IS NULL`, `semester.id = ${semesterId}`];
    const count = (await studentListService.countStudentList(queryArray))[0]?.count;
    const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: results,
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
      results: results,
    });
  }

  if (req.query?.year) {
    const year = await educationalYearService.findEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('yearNotFound'));
  }
  const { year } = req.query;

  // create an query object //
  const queryArray = [`year.year = ${year}`, `student.deletedAt IS NULL`];

  if (req.query?.semester) {
    queryArray.push(`semester.title = ${req.query.semester}`);
    const count = (await studentListService.countStudentList(queryArray))[0]?.count;
    const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: results,
    });
  }

  if (req.query?.class) {
    const classTitle = req.query.class;
    switch (classTitle) {
      case 1:
        queryArray.push(`(semester.title = 1 OR semester.title = 2)`);
        break;
      case 2:
        queryArray.push(`(semester.title = 3 OR semester.title = 4)`);
        break;
      case 3:
        queryArray.push(`(semester.title = 5 OR semester.title = 6)`);
        break;
      case 4:
        queryArray.push(`(semester.title = 7 OR semester.title = 8)`);
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, i18n.__('invalidQueryParameters'));
    }
  }
  const count = (await studentListService.countStudentList(queryArray))[0]?.count;
  const results = await studentListService.getYearAndClassStudentList(queryArray, limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: results,
  });
});

const deleteStudentList = catchAsync(async (req, res) => {
  const studentList = await studentListService.findStudentListById(req.params.studentListId);
  if (!studentList) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('student list not found'));
  await studentListService.deleteStudentList(studentList);
  return res.status(httpStatus.NO_CONTENT).send();
});

const deleteBunch = catchAsync(async (req, res) => {
  // return res.status(httpStatus.OK).send(req.body);
  const results = [];
  for await (const { studentId, semesterId } of req.body) {
    const studentList = await studentListService.getStudentListByStdIdAndSemesterId(studentId, semesterId);
    if (studentList) {
      await studentListService.deleteStudentList(studentList);
      results.push({ message: i18n.__('studentDeletedMessage', { studentId, semesterId }) });
    } else {
      results.push({ message: i18n.__('studentNotInSemesterMessage', { studentId, semesterId }) });
    }
  }
  return res.status(httpStatus.OK).send(results);
});

const promoteStudents = catchAsync(async (req, res) => {
  // Get students of the given semester:
  const semesterStudents = await studentListService.getAllStudentsBySemesterId(req.params.semesterId);
  const studentsIds = semesterStudents.map((student) => student.studentId);

  const results = [];

  for await (const studentId of studentsIds) {
    let semesterYear = (nextSemester = lastSemester = nextYear = result = null);

    // First thing first, validate if the student can go to next semester by checking taajil, tabdili, mahromiat and repeat semester

    const { message, eligible } = await checkStudentEligibilityForNextSemester(studentId);

    if (!eligible) {
      results.push({ message: message, result });
      // Skip this student
      continue;
    }

    const studentAllLists = await studentListService.findAllStudentListOfSingleStudent(studentId);
    if (studentAllLists.length >= 1 && studentAllLists.length < 15) {
      lastSemester = await semesterService.findSemesterById(studentAllLists[0].semesterId);
      if (lastSemester.title === 8) {
        // Find latest semester, if it's the 8th semester, then student is graduated.
        // if (!lastSemester.onGoing) {
        //   result = await studentListService.updatedStudentList(studentAllLists[0], { 'onGoing': false, 'completed': true });
        // }
        results.push({ message: 'Student is Graduated', result });
        continue;
      }
      semesterYear = await educationalYearService.getEducationalYear(lastSemester.educationalYearId);
      if (lastSemester.title % 2 === 0) {
        nextYear = await educationalYearService.findNextYear(semesterYear.year);
        if (!nextYear) {
          // If student was promoted to a year that didn't exist, then create one:
          nextYear = await educationalYearService.createNextEducationalYear(semesterYear.year);
        }
        nextSemester = await semesterService.findNextSemester(nextYear.id, lastSemester.title);
        // await studentListService.updatedStudentList(studentAllLists[0], { onGoing: false, completed: true });

        const studentExists = await studentExistInNextSemester(studentId, req.params.semesterId);
        if (studentExists) {
          results.push({ message: 'Student is already in next semester', result });
          continue;
        }

        result = await studentListService.createStudentList({ studentId, semesterId: nextSemester.id });
        results.push(result);
      } else {
        // If semesters were odd (1, 3, 5)
        nextSemester = await semesterService.findNextSemester(semesterYear.id, lastSemester.title);
        // await studentListService.updatedStudentList(studentAllLists[0], { onGoing: false, completed: true });

        const studentExists = await studentExistInNextSemester(studentId, req.params.semesterId);
        if (studentExists) {
          results.push({ message: 'Student is already in next semester', result });
          continue;
        }

        result = await studentListService.createStudentList({ studentId, semesterId: nextSemester.id });
        results.push(result);
      }
    } else {
      results.push({ studentId, message: 'student does not have enrollment in first semester' });
    }
  }

  // Once promotion is completed, mark the current semester as completed
  await semesterService.updateSemesterStatus(req.params.semesterId, true);

  return res.status(httpStatus.OK).send(results);
});

const reviewStudentsPromotion = catchAsync(async (req, res) => {
  // Get students of the given semester:
  const semesterStudents = await studentListService.getAllStudentsBySemesterId(req.params.semesterId);
  const studentsIds = semesterStudents.map((student) => student.studentId);

  const results = [];

  for await (const studentId of studentsIds) {
    // First thing first, validate if the student can go to next semester by checking taajil, tabdili, mahromiat and repeat semester

    const studentExists = await studentExistInNextSemester(studentId, req.params.semesterId);
    const theStudent = await studentService.getStudent(studentId);

    if (studentExists) {
      results.push({
        message: 'Student is already in next semester',
        student: theStudent,
        studentId,
        eligibility: 0,
        reason: 'duplicate',
      });
      continue;
    }

    const { message, eligible, reason } = await checkStudentEligibilityForNextSemester(studentId);

    // Get student data
    results.push({
      studentId: studentId,
      student: theStudent,
      eligibility: !!eligible,
      message,
      reason,
    });

    // Once promotion is completed, mark the current semester as completed
  }

  console.log(results);

  return res.send(results);
});

// Util functions

const studentExistInNextSemester = async (studentId, currentSemesterId) => {
  const nextSemester = await findEligibleNextSemester(currentSemesterId);

  // Prevent duplicate students to next semester
  // Creating a trigger for this in the DB is really important, as this can help us boost the speed.
  const exists = await studentListService.getStudentListByStdIdAndSemesterId(studentId, nextSemester.id);

  return !!exists;
};

module.exports = {
  deleteBunch,
  getStudentLists,
  deleteStudentList,
  createStudentList,
  promoteStudents,
  reviewStudentsPromotion,
};
