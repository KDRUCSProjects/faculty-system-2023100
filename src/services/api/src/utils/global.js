const httpStatus = require('http-status');
const { http } = require('../config/logger');
const {
  semesterService,
  educationalYearService,
  tabdiliService,
  taajilService,
  reentryService,
  studentListService,
  monfaqiService,
  subjectService,
  studentService,
  attendanceService,
} = require('../services');
const ApiError = require('./ApiError');

/**
 * find in which semester should the student must be enrolled after taajil, repeat or mahrom
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const findEligibleNextSemesterAfterConversion = async (semesterId) => {
  const currentSemester = await semesterService.findById(semesterId);

  // What if we throw Api Error?
  if (!currentSemester) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Semester not found');
  }

  const currentSemesterYear = await educationalYearService.getEducationalYear(currentSemester.educationalYearId);

  const nextSemesterYearId = await educationalYearService.findEducationalYearByValue(1 + currentSemesterYear.year);

  if (!nextSemesterYearId) {
    throw new ApiError(httpStatus.NOT_FOUND, `Please create next educational year first!`);
  }

  // Let's find our eligible semester by passing our next year and the title of (semester)
  return await semesterService.findSemesterByYearIdAndTitle(nextSemesterYearId, currentSemester.title);
};

const checkStudentEligibilityForNextSemester = async (studentId) => {
  const isMonfaq = await monfaqiService.findMonfaqiByStudentId(studentId);
  if (isMonfaq) return { message: 'Student is monfaq', eligible: 0, reason: 'monfaq' };

  // 1. Let's check if the student has been given tabdili:
  const isTabdil = await tabdiliService.findTabdiliByStudentId(studentId);
  if (isTabdil) return { message: 'Student is tabdil', eligible: 0, reason: 'tabdil' };

  // 2. Check if student has been given taajil and has not given reentry for that taajil:
  // 2.1 Let's check the general taajil first:
  const generalTaajilWithReentryisOK = await checkTaajilWithReentry(studentId, 'taajil');
  if (!generalTaajilWithReentryisOK)
    return { message: 'Student has taajil. Please add reentry.', eligible: 0, reason: 'taajil' };

  // 2.2 Let's check the special taajil:
  const specialTaajilWithReentryisOK = await checkTaajilWithReentry(studentId, 'special_taajil');
  if (!specialTaajilWithReentryisOK)
    return { message: 'Student has special taajil. Please add reentry.', eligible: 0, reason: 'taajil' };

  // 3. Check what?

  return { message: 'All good', eligible: 1, reason: null };
};

// This function checks if the student has been given taajil and has given back its reentry
const checkTaajilWithReentry = async (studentId, taajilType = 'taajil') => {
  const generalTaajil = await taajilService.findTaajilByStudentIdAndType(studentId, taajilType);
  const reentryExistForTheTaajil = await reentryService.findReentryByStudentIdAndReason(studentId, taajilType);

  // Since the student has not given taajil at all, return true;
  // -----------------------------------------------------------------
  if (!generalTaajil) return true;
  // -----------------------------------------------------------------

  // If student has been given taajil, now let's check its reentry
  if (generalTaajil && !reentryExistForTheTaajil) {
    // If has been given taajil, but not given reentry back
    return false;
  }
  if (generalTaajil && reentryExistForTheTaajil) {
    return true;
  }

  // Whatever else happens, return false;
  return false;
};

/**
 * find next semester for student
 * @param {ObjectId} yearId
 * @param {ObjectId} semesterTitle
 * @returns {Promise<Semester>}
 */
const findEligibleNextSemester = async (currentSemester) => {
  const { id, title, educationalYearId } = await semesterService.findById(currentSemester);

  const semesterYear = await educationalYearService.getEducationalYear(educationalYearId);

  const theYear = title % 2 === 0 ? ++semesterYear.year : semesterYear.year;

  const { id: findTheYearId } = await educationalYearService.getEducationalYearByValue(theYear);

  return await semesterService.findSemester({
    educationalYearId: findTheYearId,
    title: title + 1,
  });
};

/**
 * find semester year and half
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const findSemesterYearAndHalf = async (educationalYearId, title) => {
  const { educationalYearId: id } = await semesterService.findSemesterByYearIdAndTitle(educationalYearId, title);
  const { year, firstHalf } = await educationalYearService.getEducationalYear(id);

  return { year: firstHalf };
};

/**
 * match student current semester with on-going semester
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const matchStudentSemesterWithOnGoingSemester = async (studentId) => {
  // Get student on-going semester id
  const currentSemesterId = await studentListService.findStudentLatestSemesterId(studentId);

  if (!currentSemesterId) {
    return { message: 'Semester not found', eligible: 0 };
  }

  const currentSemester = await semesterService.findById(currentSemesterId);

  // Get current on-going year
  const currentYear = await educationalYearService.getCurrentEducationalYear();

  // Find if current semester is first or second
  const currentSemesterHalf = currentSemester.title % 2;
  const semesterRank = currentSemesterHalf === 0 ? '2nd' : '1st';

  const data = { year: currentYear?.year, eligibleSemester: semesterRank };

  if (currentSemester.educationalYearId !== currentYear.id || currentSemesterHalf != currentYear.firstHalf) {
    return { message: `Semester year and title doesnt match current year and its half`, eligible: 0, data };
  }

  return { message: 'All good', eligible: 1, data };
};

/**
 * match semesterId with on-going semester
 * @param {ObjectId} semesterId
 * @returns {Promise<Semester>}
 */
const matchSemesterWithOnGoingSemester = async (semesterId) => {
  // Find the desired semester
  const theSemester = await semesterService.findById(semesterId);

  // Get current on-going year
  const currentYear = await educationalYearService.getCurrentEducationalYear();

  // Find if current semester is first or second
  const theSemesterHalf = theSemester.title % 2;
  const semesterRank = theSemesterHalf === 0 ? '2nd' : '1st';

  const data = { year: currentYear?.year, eligibleSemester: semesterRank };

  if (theSemester.educationalYearId !== currentYear.id || theSemesterHalf != currentYear.firstHalf) {
    return { message: `Semester year and title doesnt match current year and its half`, eligible: 0, data };
  }

  return { message: 'All good', eligible: 1, data };
};

const translateFields = (field) => {
  let t = field;
  if (t === 'male') return 'نارینه';
  if (t === 'female') return 'شځینه';
  if (t === 'present') return 'حاضر';
  if (t === 'taajil') return 'تاجیل';
  if (t === 'reentry') return 'بیاشمولیت';
  if (t === 'total') return 'کلی';
  if (t === 'tabdili') return 'تبدیل';
  if (t === 'monfaq') return 'منفق';
};

/**
 * get attendance report by subjectId
 * @param {ObjectId} subjectId
 * @returns {Promise<AttendanceReport>}
 */

const getAttendanceReportBySubjectId = async (subjectId, month) => {
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');

  // Get above subject's students
  const semesterStudents = await studentListService.getAllStudentsBySemesterId(subject.semesterId);

  // Let's filter the view

  const response = {
    subject,
    month,
  };

  const students = [];
  // Prepare data
  for (let i = 0; i < semesterStudents.length; i++) {
    const student = await studentService.getStudent(semesterStudents[i].studentId);
    // Lets attach student data
    const report = await attendanceService.getAttendanceReport({ subjectId, month, studentId: student.id });

    students.push({
      kankorId: student.dataValues.kankorId,
      fullName: student.dataValues.fullName,
      grandFatherName: student.dataValues.grandFatherName,
      photo: student.dataValues.photo,
      studentId: student.dataValues.id,
      absent: report?.absent || 0,
      present: report?.present || 0,
      reportId: report?.id,
    });
  }

  response.students = students;

  return response;
};

module.exports = {
  findEligibleNextSemesterAfterConversion,
  checkStudentEligibilityForNextSemester,
  checkTaajilWithReentry,
  findEligibleNextSemester,
  findSemesterYearAndHalf,
  matchStudentSemesterWithOnGoingSemester,
  matchSemesterWithOnGoingSemester,
  translateFields,
  getAttendanceReportBySubjectId,
};
