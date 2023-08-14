const httpStatus = require('http-status');
const moment = require('moment-jalaali');
const catchAsync = require('../utils/catchAsync');
const {
  attendanceService,
  subjectService,
  userService,
  studentListService,
  attendanceListService,
  semesterService,
  studentService,
} = require('../services');
const ApiError = require('../utils/ApiError');

// const getAttendances = catchAsync(async (req, res) => {
//   const results = await attendanceService.getAttendances();
//   return res.status(httpStatus.OK).send(results);
// });

const getAttendance = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const attendance = await attendanceService.findAttendanceBySubjectId(req.params.subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  return res.status(httpStatus.OK).send(attendance);
});

const getAttendanceById = catchAsync(async (req, res) => {
  const attendance = await attendanceService.getAttendance(req.params.attendanceId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  return res.status(httpStatus.OK).send(attendance);
});

const getTodaysAttendance = catchAsync(async (req, res) => {
  const day = moment().format('dddd');
  if (day === 'Friday' || day === 'friday') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance on Friday');
  }

  // prevent attendance to be not taken after six pm
  const now = moment();
  const sixPM = moment().set({ hour: 18, minute: 0, second: 0 });
  if (now.isAfter(sixPM)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance After 6 pm');
  }
  const { subjectId } = req.params;
  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  if (!subject.teacherId) throw new ApiError(httpStatus.BAD_REQUEST, 'Subject Should be assign to a teacher');
  const teacher = await userService.getTeacher(subject.teacherId);
  if (!teacher) throw new ApiError(httpStatus.BAD_REQUEST, 'Teacher Not Found');
  // check subject is related to teacher
  if (req.user.role !== 'admin' && subject.teacherId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'FORBiDDEN');
  }
  // const date = moment().format('YYYY-MM-DD');
  const date = moment();
  const shamsiDate = moment(date).format('jYYYY-jMM-jDD HH:mm:ss');
  // const date = moment().format('MMMM Do YYYY, h:mm:ss a');
  // find attendance
  const attendance = await attendanceService.findAttendanceBySubjectId(subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');

  let results = await attendanceListService.getSemesterSdtAndAttendance(attendance.id);

  if (results.length <= 0) {
    // get all students of the semester
    // find semester
    const semester = await semesterService.findById(subject.semesterId);
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
    // check if semester is on going
    const isSemesterOnGoing = await semesterService.isSemesterOnGoing(semester.id);
    if (!isSemesterOnGoing) throw new ApiError(httpStatus.NOT_ACCEPTABLE, `it is not ongoing semester's subject`);

    const semesterStudents = await studentListService.findSemesterStudents(semester.id);
    // take attendance for absent students
    for await (const element of semesterStudents) {
      const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
      if (doesStdHasAtt) {
        await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentOne: false, isPresentTwo: false });
      } else {
        const newAtt = {
          studentId: element.studentId,
          attendanceId: attendance.id,
          isPresentOne: false,
          isPresentTwo: false,
          date,
          shamsiDate,
        };
        await attendanceListService.takeTodaysAttendance(newAtt);
      }
    }
    results = await attendanceListService.getSemesterSdtAndAttendance(attendance.id);
  }
  if (results.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'There is not any student in the semester');
  }
  const { subjectName, teacherId, teacherName } = results[0];
  const students = results.map((element) => {
    return {
      studentId: element.studentId,
      studentName: element.studentName,
      nickName: element.nickName,
      fatherName: element.fatherName,
      kankorId: element.kankorId,
      grandFatherName: element.grandFatherName,
      date: element.date,
      shamsiDate: element.shamsiDate,
      isPresentOne: element.isPresentOne,
      isPresentTwo: element.isPresentTwo,
    };
  });
  return res.status(httpStatus.OK).send({ date, shamsiDate, subjectId, subjectName, teacherId, teacherName, students });
});

const takeTodaysAttendance = catchAsync(async (req, res) => {
  // prevent attendance to be not taken on friday
  // const date = moment().format('YYYY-MM-DD');
  const date = moment();
  const shamsiDate = moment(date).format('jYYYY-jMM-jDD HH:mm:ss');
  const day = moment().format('dddd');
  if (day === 'Friday' || day === 'friday') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance on Friday');
  }

  // prevent attendance to be not taken after six pm
  const now = moment();
  const sixPM = moment().set({ hour: 18, minute: 0, second: 0 });
  if (now.isAfter(sixPM)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance After 6 pm');
  }
  const { subjectId } = req.params;
  // find subject
  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  // check subject is related to teacher
  if (req.user.role !== 'admin' && subject.teacherId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'FORBiDDEN');
  } // find attendance
  const attendance = await attendanceService.findAttendanceBySubjectId(subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  // find teacher
  const teacher = await userService.getTeacher(subject.teacherId);
  if (!teacher) throw new ApiError(httpStatus.BAD_REQUEST, 'Teacher Not Found');
  // find semester
  const semester = await semesterService.findById(subject.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  // check if semester is on going
  const isSemesterOnGoing = await semesterService.isSemesterOnGoing(semester.id);
  if (!isSemesterOnGoing) throw new ApiError(httpStatus.NOT_ACCEPTABLE, `it is not ongoing semester's subject`);

  // get all students of the semester
  const semesterStudents = await studentListService.findSemesterStudents(semester.id);
  const studentsToBePresented = [];
  const studentsToBeAbsented = [];
  const totalStudents = semesterStudents.length;
  let totalPresentStudents = 0;
  let totalAbsentStudents = 0;

  // separate present and absent students
  semesterStudents.forEach((element) => {
    const ob = req.body.students.find(({ studentId }) => studentId === element.studentId);
    if (ob) {
      studentsToBePresented.push(ob);
      if (ob.status) totalPresentStudents++;
      else totalAbsentStudents++;
    } else {
      studentsToBeAbsented.push(element);
      totalAbsentStudents++;
    }
  });

  // let's take attendance
  switch (req.query.type) {
    case 'one':
      // take attendance for present students
      for await (const element of studentsToBePresented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentOne: element.status });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentOne: element.status,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }

      // take attendance for absent students
      for await (const element of studentsToBeAbsented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentOne: false });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentOne: false,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }
      return res.status(httpStatus.OK).send({ totalStudents, totalPresentStudents, totalAbsentStudents });
    case 'two':
      // take attendance for present students
      for await (const element of studentsToBePresented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentTwo: element.status });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentTwo: element.status,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }

      // take attendance for absent students
      for await (const element of studentsToBeAbsented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentTwo: false });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentTwo: false,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }
      return res.status(httpStatus.OK).send({ totalStudents, totalPresentStudents, totalAbsentStudents });
    case 'both':
      // take attendance for present students
      for await (const element of studentsToBePresented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, {
            isPresentOne: element.status,
            isPresentTwo: element.status,
          });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentOne: element.status,
            isPresentTwo: element.status,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }

      // take attendance for absent students
      for await (const element of studentsToBeAbsented) {
        const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(element.studentId, attendance.id);
        if (doesStdHasAtt) {
          await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentOne: false, isPresentTwo: false });
        } else {
          const newAtt = {
            studentId: element.studentId,
            attendanceId: attendance.id,
            isPresentOne: false,
            isPresentTwo: false,
            date,
            shamsiDate,
          };
          await attendanceListService.takeTodaysAttendance(newAtt);
        }
      }
      return res.status(httpStatus.OK).send({ totalStudents, totalPresentStudents, totalAbsentStudents });
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'invalid query parameters');
  }
});

const takeOneStdAttendance = catchAsync(async (req, res) => {
  // const date = moment().format('YYYY-MM-DD');
  const date = moment();
  const shamsiDate = moment(date).format('jYYYY-jMM-jDD HH:mm:ss');

  // prevent attendance to be not taken on friday
  const day = moment().format('dddd');

  if (day === 'Friday' || day === 'friday') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance on Friday');
  }

  // prevent attendance to be not taken after six pm
  const now = moment();
  const sixPM = moment().set({ hour: 18, minute: 0, second: 0 });
  if (now.isAfter(sixPM)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You Cannot Take Attendance After 6 pm');
  }

  const { subjectId } = req.params;
  const { studentId, status } = req.body;
  // find subject
  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  // check subject is related to teacher
  if (req.user.role !== 'admin' && subject.teacherId !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'FORBiDDEN');
  }
  // find attendance
  const attendance = await attendanceService.findAttendanceBySubjectId(subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');
  // find teacher
  const teacher = await userService.getTeacher(subject.teacherId);
  if (!teacher) throw new ApiError(httpStatus.BAD_REQUEST, 'Teacher Not Found');
  // find semester
  const semester = await semesterService.findById(subject.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  // check if semester is on going
  const isSemesterOnGoing = await semesterService.isSemesterOnGoing(semester.id);
  if (!isSemesterOnGoing) throw new ApiError(httpStatus.NOT_ACCEPTABLE, `it is not ongoing semester's subject`);

  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');

  // get all students of the semester
  const semesterStudents = await studentListService.findSemesterStudents(semester.id);
  const std = semesterStudents.find((element) => element.studentId === studentId);
  if (!std) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student does not exist in this semester');

  // let's take attendance
  switch (req.query.type) {
    case 'one':
      const doesStdHasAtt = await attendanceListService.findStudentFirstCellAttendance(studentId, attendance.id);
      if (doesStdHasAtt) {
        const result = await attendanceListService.updateTodaysAttendance(doesStdHasAtt, { isPresentOne: status });
        return res.status(httpStatus.ACCEPTED).send(result);
      }
      const newAtt = {
        studentId,
        attendanceId: attendance.id,
        isPresentOne: status,
        date,
        shamsiDate,
      };
      const result = await attendanceListService.takeTodaysAttendance(newAtt);
      return res.status(httpStatus.CREATED).send(result);

    case 'two':
      const doesStdHas2Att = await attendanceListService.findStudentFirstCellAttendance(studentId, attendance.id);
      if (doesStdHas2Att) {
        const result = await attendanceListService.updateTodaysAttendance(doesStdHas2Att, { isPresentTwo: status });
        return res.status(httpStatus.ACCEPTED).send(result);
      } else {
        const newAtt = {
          studentId,
          attendanceId: attendance.id,
          isPresentTwo: status,
          date,
          shamsiDate,
        };
        const result = await attendanceListService.takeTodaysAttendance(newAtt);
        return res.status(httpStatus.CREATED).send(result);
      }

    case 'both':
      const doesStdHasBothAtt = await attendanceListService.findStudentFirstCellAttendance(studentId, attendance.id);
      if (doesStdHasBothAtt) {
        const result = await attendanceListService.updateTodaysAttendance(doesStdHasBothAtt, {
          isPresentTwo: status,
          isPresentOne: status,
        });
        return res.status(httpStatus.ACCEPTED).send(result);
      } else {
        const newAtt = {
          studentId,
          attendanceId: attendance.id,
          isPresentOne: status,
          isPresentTwo: status,
          date,
          shamsiDate,
        };
        const result = await attendanceListService.takeTodaysAttendance(newAtt);
        return res.status(httpStatus.CREATED).send(result);
      }

    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'invalid query parameters');
  }
});

const createExcelFile = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  console.log(semesterId);
  const semester = await semesterService.findById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const subjects = await subjectService.getSemesterSubjects(semesterId);
  if (subjects.length === 0) throw new ApiError(httpStatus.NOT_FOUND, 'subjects are not created for this semester');
  const students = await subjectService.getSemesterStudents(semesterId);
  return res.send(students);
});

module.exports = {
  getAttendance,
  createExcelFile,
  getAttendanceById,
  getTodaysAttendance,
  takeTodaysAttendance,
  takeOneStdAttendance,
};
