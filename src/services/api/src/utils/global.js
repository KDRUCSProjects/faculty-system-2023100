const httpStatus = require('http-status');
const {
  semesterService,
  educationalYearService,
  tabdiliService,
  taajilService,
  reentryService,
  studentListService,
  monfaqiService,
  subjectService,
  shokaService,
  shokaListService,
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
 * 
 * @param {ObjectId} studentId 
 * @param {ObjectId} semesterId 
 * @returns {Boolean}
 */
const isRepeatSemester = async (studentId, semesterId) => {
  const subjects = await subjectService.getSemesterSubjects(semesterId);
  let totalCredits = 0;
  let failedCredits = 0;
  let semesterMarks = 0;

  for await (const subject of subjects) {
    const { credit } = subject;
    totalCredits += credit;
    const shoka = await shokaService.findShokaBySubjectId(subject.id);
    const conditions = [
      `shokalist.deletedAt IS NULL`,
      `shokalist.shokaId  = ${shoka.id}`,
      `shokalist.studentId = ${studentId}`,
      `semester.id = ${semesterId}`,
      `shokalist.chance = 1`,
    ];
    const subjectMarks = await shokaListService.getStudentMarks(conditions);
    if (subjectMarks.length === 0) {
      failedCredits += credit;
    } else {
      if (subjectMarks.length === 1) {
        const projectMarks = subjectMarks[0].projectMarks ? subjectMarks[0].projectMarks : 0;
        const assignment = subjectMarks[0].assignment ? subjectMarks[0].assignment : 0;
        const practicalWork = subjectMarks[0].practicalWork ? subjectMarks[0].practicalWork : 0;
        const finalMarks = subjectMarks[0].finalMarks ? subjectMarks[0].finalMarks : 0;
        const totalMarks = (projectMarks + assignment + finalMarks + practicalWork);
        const totalSemMarks = totalMarks * credit;
        semesterMarks += totalSemMarks;
        if (totalMarks < 55) {
          failedCredits += credit;
        }
      } else {
        failedCredits += credit;
      }
    }
  }
  const percentage = Number(semesterMarks / totalCredits);
  if (percentage < 55 || (failedCredits > (totalCredits / 2))) {
    return true;
  } else {
    return false;
  }
}

/**
 * find if student has کتبی اخطار or شفاهی اخطار
 * @param {ObjectId} studentId 
 * @param {ObjectId} semesterTitle 
 * @returns {Boolean}
 */
const doesStudentHasWarning = async (studentId, semesterId) => {
  const subjects = await subjectService.getSemesterSubjectsSortedById(semesterId);
  let totalCredits = 0;
  const studentMarks = [];
  // marks to be calculated for percentage
  let totalMarksForPercentage = 0;
  for await (const subject of subjects) {
    const { credit } = subject;
    // sum of total credits
    totalCredits += credit;
    const shoka = await shokaService.findShokaBySubjectId(subject.id);
    const conditions = [
      `shokalist.deletedAt IS NULL`,
      `shokalist.shokaId  = ${shoka.id}`,
      `student.id = ${studentId}`,
      `semester.id = ${semesterId}`,
    ];
    const subjectMarks = await shokaListService.getStudentMarksSortByName(conditions);
    const formattedMarks = marksFormatter(subjectMarks);
    if (formattedMarks[3] && formattedMarks[3] >= 55) {
      totalMarksForPercentage += (formattedMarks[3] * credit);
    } else if (formattedMarks[2] && formattedMarks[2] >= 55) {
      totalMarksForPercentage += (formattedMarks[2] * credit);
    } else if (formattedMarks[1] && formattedMarks[1] >= 55) {
      totalMarksForPercentage += (formattedMarks[1] * credit);
    }
    studentMarks.push(formattedMarks);
  }
  if ((totalMarksForPercentage / totalCredits) >= 55 && (totalMarksForPercentage / totalCredits) <= 60) {
    return true;
  } else {
    return false;
  }
}

// format marks for creating result sheet file in excel
const marksFormatter = (arr) => {
  const ob = {};

  // if student does not have marks
  if (arr.length === 0) {
    ob[1] = null;
    ob[2] = null;
    ob[3] = null;
  }

  // if student has one chance marks
  if (arr.length === 1) {
    if (arr[0].chance === 1) {
      ob[2] = null;
      ob[3] = null;
    }
    if (arr[0].chance === 2) {
      ob[1] = null;
      ob[3] = null;
    }
    if (arr[0].chance === 3) {
      ob[2] = null;
      ob[1] = null;
    }
    arr.map((element) => {
      const projectMarks = element.projectMarks ? element.projectMarks : 0;
      const assignment = element.assignment ? element.assignment : 0;
      const practicalWork = element.practicalWork ? element.practicalWork : 0;
      const finalMarks = element.finalMarks ? element.finalMarks : 0;
      const totalMarks = projectMarks + assignment + finalMarks + practicalWork;
      // const totalWithCredit = totalMarks * element.subjectCredit;
      ob[element.chance] = totalMarks;
    });
  } else if (arr.length === 2) {
    if (arr[0].chance === 1 && arr[1].chance === 2) {
      ob[3] = null;
    }
    if (arr[0].chance === 1 && arr[1].chance === 3) {
      ob[2] = null;
    }
    if (arr[0].chance === 2 && arr[1].chance === 3) {
      ob[1] = null;
    }
    arr.forEach((element) => {
      const projectMarks = element.projectMarks ? element.projectMarks : 0;
      const assignment = element.assignment ? element.assignment : 0;
      const practicalWork = element.practicalWork ? element.practicalWork : 0;
      const finalMarks = element.finalMarks ? element.finalMarks : 0;
      const totalMarks = projectMarks + assignment + finalMarks + practicalWork;
      // const totalWithCredit = totalMarks * element.subjectCredit;
      ob[element.chance] = totalMarks;
    });
  } else if (arr.length === 3 || arr.length === 4) {
    arr.forEach((element) => {
      const projectMarks = element.projectMarks ? element.projectMarks : 0;
      const assignment = element.assignment ? element.assignment : 0;
      const practicalWork = element.practicalWork ? element.practicalWork : 0;
      const finalMarks = element.finalMarks ? element.finalMarks : 0;
      const totalMarks = projectMarks + assignment + finalMarks + practicalWork;
      // const totalWithCredit = totalMarks * element.subjectCredit;
      ob[element.chance] = totalMarks;
    });
  }
  return ob;
};

/**
 * get attendance report by subjectId
 * @param {ObjectId} subjectId
 * @returns {Promise<AttendanceReport>}
 */

const getAttendanceReportBySubjectId = async (subjectId, month, studentId = null) => {
  if (typeof month != 'number') {
    throw new ApiError(httpStatus.NOT_FOUND, 'month is required');
  }
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');

  // Get above subject's students or it only only student was requested
  let semesterStudents = studentId
    ? await studentListService.findListedStudentByStudentId(studentId)
    : await studentListService.getAllStudentsBySemesterId(subject.semesterId);

  if (!semesterStudents) {
    semesterStudents = [];
  }

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

    const mahromiat = await checkStudentMahromiatBySubjectId(student.id, subjectId);

    // console.log(student.id, subjectId);

    students.push({
      kankorId: student.dataValues.kankorId,
      fullName: student.dataValues.fullName,
      grandFatherName: student.dataValues.grandFatherName,
      photo: student.dataValues.photo,
      studentId: student.dataValues.id,
      absent: report?.absent || 0,
      present: report?.present || 0,
      reportId: report?.id,
      isMahrom: mahromiat?.isMahrom,
      totalPresent: mahromiat.totalPresent,
      totalAbsent: mahromiat.totalAbsent,
    });
  }

  response.students = students;

  return response;
};

/**
 * check student mahrom-iat by semesterId
 * @param {ObjectId} semesterId
 * @returns {Promise<Student>}
 */

const checkStudentMahromiatBySemesterId = async (studentId, semesterId) => {
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');

  const semester = await semesterService.findById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');

  // Let's do this:
  const subjects = await subjectService.getSemesterSubjectsSortedById(semesterId);

  // Total credits of the semester
  let totalCreditsOfSemester = 0;
  subjects.forEach((s) => {
    totalCreditsOfSemester += s.credit;
  });

  // if (!subjects || subjects.length === 0) throw new ApiError(httpStatus.NOT_FOUND, 'semester does not have any subjects');

  let grandTotalPresent = 0;
  let grandTotalAbsent = 0;

  // Variables to watch for

  let totalCreditsMahrom = 0;
  let isMahrom = false;
  let repeatSemester = false;
  const mahromSubjects = [];

  let { attendancePercentage, monthStart, monthEnd, totalWeeks } = semester;

  for (let i = 0; i < subjects.length; i++) {
    let totalPresent = 0;
    let totalAbsent = 0;
    for (let j = monthStart; j <= monthEnd; j++) {
      const report = await getAttendanceReportBySubjectId(subjects[i].id, j, student.id);
      const theStudent = report.students[0];
      // Singular Subject total
      totalPresent += theStudent.present;
      totalAbsent += theStudent.absent;

      // Overall total of every subject
      grandTotalPresent += theStudent.present;
      grandTotalAbsent += theStudent.absent;
    }

    // Check if student is mahrom in this subject:
    if ((totalAbsent / (totalWeeks * subjects[i].credit)) * 100 > attendancePercentage) {
      mahromSubjects.push({
        subjectId: subjects[i].id,
        totalAbsent: totalAbsent,
        totalPresent: totalPresent,
      });

      totalCreditsMahrom += subjects[i].credit;
    }
  }

  // Now, check if student is mahrom in every subject
  if (mahromSubjects.length === subjects.length) isMahrom = true;

  // Also check, if grand total present is 0 or null
  if (!!!grandTotalPresent) isMahrom = true;

  // Check if student is repeat semester
  if (Math.round(totalCreditsOfSemester / 2) < totalCreditsMahrom) repeatSemester = true;

  return {
    // Helpful data:
    totalCreditsMahrom,
    totalAbsent: grandTotalAbsent,
    totalPresent: grandTotalPresent,
    // Important data:
    mahromSubjects,
    isMahrom,
    repeatSemester,
  };
};

/**
 * check student mahrom-iat by semesterId
 * @param {ObjectId} semesterId
 * @returns {Promise<Student>}
 */

const checkStudentMahromiatBySubjectId = async (studentId, subjectId) => {
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');

  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');

  const semester = await semesterService.findById(subject.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');

  // Variables to watch for

  let isMahrom = false;

  let { attendancePercentage, monthStart, monthEnd, totalWeeks } = semester;

  let totalPresent = 0;
  let totalAbsent = 0;

  for (let j = monthStart; j <= monthEnd; j++) {
    const report = await attendanceService.getAttendanceReport({ subjectId, month: j, studentId });

    // Singular Subject total
    totalPresent += report?.present || 0;
    totalAbsent += report?.absent || 0;
  }

  // Check if student is mahrom in this subject:
  if ((totalAbsent / (totalWeeks * subject.credit)) * 100 > attendancePercentage) {
    // Then student is mahrom
    isMahrom = true;
  }

  return {
    isMahrom,
    totalAbsent,
    totalPresent,
  };
};

/**
 * check student status by semester such as: taajli, mahromiat, repeat semester and more...
 * @param {ObjectId} semesterId
 * @returns {Promise<Student>}
 */

const checkStudentStatusBySemesterId = async (studentId, semesterId) => {
  const allStatus = [];

  const { isMahrom, repeatSemester } = await checkStudentMahromiatBySemesterId(studentId, semesterId);
  if (isMahrom) allStatus.push('mahrom');
  if (repeatSemester) allStatus.push('repeat_semester');

  // if (taajil);
  // if (reentry);
  // Will be added...

  return allStatus;
};

module.exports = {
  checkStudentMahromiatBySubjectId,
  checkStudentMahromiatBySemesterId,
  checkStudentStatusBySemesterId,
  marksFormatter,
  doesStudentHasWarning,
  findEligibleNextSemesterAfterConversion,
  checkStudentEligibilityForNextSemester,
  checkTaajilWithReentry,
  findEligibleNextSemester,
  findSemesterYearAndHalf,
  matchStudentSemesterWithOnGoingSemester,
  matchSemesterWithOnGoingSemester,
  translateFields,
  getAttendanceReportBySubjectId,
  isRepeatSemester,
};
