const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  studentService,
  semesterService,
  studentListService,
  taajilService,
  tabdiliService,
  educationalYearService,
  monfaqiService,
  subjectService,
  shokaListService,
} = require('../services');
const ApiError = require('../utils/ApiError');
const {
  checkStudentEligibilityForNextSemester,
  findEligibleNextSemester,
  checkStudentMahromiatBySemesterId,
  isRepeatSemester,
} = require('../utils/global');

const createStudentList = catchAsync(async (req, res) => {
  const { studentId, semesterId } = req.body;
  /** check if the student id is correct */
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');

  // First, check if student kankor year matches current on-going year
  const currentEduYear = (await educationalYearService.getCurrentEducationalYear())?.year;
  const studentKankorYear = (await educationalYearService.getEducationalYear(student.educationalYearId))?.year;

  // Let's disable this for now.
  // if (studentKankorYear !== currentEduYear)
  //   throw new ApiError(httpStatus.NOT_ACCEPTABLE, `Student can be only enrolled at ${studentKankorYear}. `);

  /** check if tabdily has been given to the student */

  // Check if student is tabdil or monfaq
  const isMonfaq = await monfaqiService.findMonfaqiByStudentId(studentId);
  const isTabdil = await tabdiliService.findTabdiliByStudentId(studentId);
  if (isMonfaq) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is monfaq!');
  } else if (isTabdil) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is tabdil!');
  }

  // Good, let's do this now.

  /** find student all student lists */
  const studentList = await studentListService.findAllStudentListOfSingleStudent(studentId);
  /** if student has not registered to any semester we will give reentry */
  if (studentList.length >= 1) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is Already Enrolled in a semester');
  /** check semester id if it is correct */
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');

  /** check if the semester title is one */
  const studentType = student?.kankorType;
  if (semester.title !== 1 && studentType !== 'pass14')
    throw new ApiError(httpStatus.ACCEPTED, `You can only enroll the student at first semester`);

  if (semester.title !== 5 && studentType !== 'general')
    throw new ApiError(httpStatus.ACCEPTED, `You can only enroll the student at 5h semester. Student is 14 Pass`);

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
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
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
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
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
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
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
  if (!studentList) throw new ApiError(httpStatus.NOT_FOUND, 'student list not found');
  // check student marks in that semester
  const conditions = [
    `shokalist.deletedAt IS NULL`,
    `student.id = ${studentList.studentId}`,
    `semester.id = ${studentList.semesterId}`,
  ];
  const subjectMarks = await shokaListService.getStudentMarksSortByName(conditions);
  if (subjectMarks.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student has Marks in this Semester. Delete first that');
  }
  await studentListService.deleteStudentList(studentList);
  return res.status(httpStatus.NO_CONTENT).send();
});

const deleteBunch = catchAsync(async (req, res) => {
  // return res.status(httpStatus.OK).send(req.body);
  const results = [];
  for await (const { studentId, semesterId } of req.body) {
    const studentList = await studentListService.getStudentListByStdIdAndSemesterId(studentId, semesterId);
    if (studentList) {
      // check student marks in that semester
      const conditions = [
        `shokalist.deletedAt IS NULL`,
        `student.id = ${studentList.studentId}`,
        `semester.id = ${studentList.semesterId}`,
      ];
      const subjectMarks = await shokaListService.getStudentMarksSortByName(conditions);
      if (subjectMarks.length > 0) {
        results.push({ message: `student id ${studentId} has marks in ${semesterId} semester` });
      } else {
        await studentListService.deleteStudentList(studentList);
        results.push({ message: `student id ${studentId} and semester id ${semesterId} is deleted` });
      }
    } else {
      results.push({ message: `student id ${studentId} and semester id ${semesterId} is not Found` });
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

    // Check student mahromiat
    const { isMahrom, repeatSemester } = await checkStudentMahromiatBySemesterId(studentId, req.params.semesterId);

    // Absent
    if (isMahrom) {
      results.push({
        message: `Student is absent in all subjects`,
      });
      continue;
    }

    if (repeatSemester) {
      results.push({
        message: `Student is repeat semester by mahromiat in subjects`,
      });
      continue;
    }

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
        await studentService.makeStudentGraduated(studentId);
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

  // semester subjects
  const subjects = await subjectService.getSemesterSubjects(req.params.semesterId);

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

    // Check student mahromiat
    const mahromiat = await checkStudentMahromiatBySemesterId(studentId, req.params.semesterId);

    const { isMahrom, repeatSemester, mahromSubjects } = mahromiat;

    const mahromSubjectsNames = [];

    mahromSubjects.forEach((subject) => {
      subjects.forEach((s) => {
        if (s.id === subject.subjectId) {
          mahromSubjectsNames.push(s.name);
        }
      });
    });

    const mahromSubjectsTitle = mahromSubjectsNames.join(',');

    // Absent
    if (isMahrom) {
      results.push({
        message: `Student is absent in all subjects`,
        student: theStudent,
        studentId,
        eligibility: 0,
        reason: 'absent',
      });
      continue;
    }

    // Check if student is repeat semester in subjects
    const repeatSemesterBySubjects = await isRepeatSemester(studentId, req.params.semesterId);

    if (repeatSemester) {
      results.push({
        message: `Student is repeat semester in ${mahromSubjectsTitle} by mahromiat`,
        student: theStudent,
        studentId,
        eligibility: 0,
        reason: 'repeat_semester',
      });
      continue;
    } else if (repeatSemesterBySubjects) {
      results.push({
        message: `Student is repeat semester by failing in subjects`,
        student: theStudent,
        studentId,
        eligibility: 0,
        reason: 'repeat_semester',
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
