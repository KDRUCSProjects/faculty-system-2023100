const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  subjectService,
  shokaService,
  attendanceService,
  userService,
  semesterService,
  educationalYearService,
  attendanceListService,
  studentService,
} = require('../services');
const ApiError = require('../utils/ApiError');
const { subjectsFormatter } = require('../utils/marks.formatter');
const moment = require('moment');
const Excel = require('exceljs');
const path = require('path');

const createSubject = catchAsync(async (req, res) => {
  if (req.body.teacherId) {
    const teacher = await userService.getTeacher(req.body.teacherId);
    if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  const semester = await semesterService.findSemesterById(req.body.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const results = await subjectService.createSubject(req.body);
  await shokaService.createShoka({ subjectId: results.id });
  await attendanceService.createAttendance({ subjectId: results.id });
  res.status(httpStatus.CREATED).send(results);
});

const getSubjects = catchAsync(async (req, res) => {
  if (req.query?.status) {
    const unsignedSubjects = await subjectService.getUnassignedSubjects();
    return res.status(httpStatus.OK).send(unsignedSubjects);
  }
  if (req.query?.semesterId) {
    const semester = await semesterService.findSemesterById(req.query.semesterId);
    if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
    const semSubjects = await subjectService.getSemesterSubjects(semester.id);
    return res.status(httpStatus.OK).send(semSubjects);
  }
  const results = await subjectService.getSubjects();
  res.status(httpStatus.OK).send(results);
});

const deleteSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const attendance = await attendanceService.findAttendanceBySubjectId(subject.id);
  if (attendance) await attendanceService.deleteAttendance(attendance);
  const shoka = await shokaService.findShokaBySubjectId(subject.id);
  if (shoka) await shokaService.deleteShoka(shoka);
  await subjectService.deleteSubject(req.user, subject);
  res.status(httpStatus.NO_CONTENT).send();
});

const getSubject = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubject(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  res.status(httpStatus.OK).send(subject);
});

const getTeacherSubjects = catchAsync(async (req, res) => {
  const { teacherId } = req.params;

  if (req.query.all) {
    const teacher = await userService.getTeacher(teacherId);
    if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'teacher not found');
    const subjects = await subjectService.getTeacherSubjects(teacherId);
    return res.status(httpStatus.OK).send(subjects);
  }

  const { year: onGoingYear } = await educationalYearService.getCurrentEducationalYear();
  const year = await educationalYearService.getEducationalYearByValue(req.query?.year || onGoingYear);

  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Year Not Found');
  const subjects = await subjectService.getTeacherSubjectsOfYear(teacherId, year.id);
  if (subjects.length <= 0) {
    return res.status(httpStatus.OK).send(subjects);
  }

  // Only send the current on-going half subjects
  const isFirstHalf = year.firstHalf;
  let halfSubjects = [];
  for (let i = 0; i < subjects.length; i++) {
    if (!subjects[i].semesterId) continue;
    let semester = await semesterService.findSemesterById(subjects[i]?.semesterId);

    if (isFirstHalf && semester.title % 2 !== 0) {
      halfSubjects.push(subjects[i]);
    } else if (!isFirstHalf && semester.title % 2 === 0) {
      halfSubjects.push(subjects[i]);
    }
  }

  const results = subjectsFormatter(halfSubjects);
  return res.status(httpStatus.OK).send(results);
});

const getSemesterStudents = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const students = await subjectService.getSemesterStudents(subject.semesterId);
  return res.status(httpStatus.OK).send(students);
});

const updatedSubject = catchAsync(async (req, res) => {
  if (req.body.teacherId) {
    const teacher = await userService.getTeacher(req.body.teacherId);
    if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found');
  }
  const subject = await subjectService.getSubjectById(req.params.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const results = await subjectService.updatedSubject(subject, req.body);
  res.status(httpStatus.ACCEPTED).send(results);
});

const assignSubjectToTeacher = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.body.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const teacher = await userService.getTeacher(req.body.teacherId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'Teacher Not Found');
  const results = await subjectService.updatedSubject(subject, { teacherId: req.body.teacherId });
  return res.status(httpStatus.ACCEPTED).send(results);
});

const takeBackSubjectFromTeacher = catchAsync(async (req, res) => {
  const subject = await subjectService.getSubjectById(req.body.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  if (subject.teacherId !== req.body.teacherId)
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'this subject is not related to this teacher');
  const results = await subjectService.updatedSubject(subject, { teacherId: null });
  return res.status(httpStatus.ACCEPTED).send(results);
});

const createReport = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const { startDate, endDate } = req.query;

  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  const attendance = await attendanceService.findAttendanceBySubjectId(subjectId);
  if (!attendance) throw new ApiError(httpStatus.NOT_FOUND, 'attendance not found');

  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDate).format('YYYY-MM-DD');

  const attendancesReport = await attendanceListService.createReport(attendance.id, formattedStartDate, formattedEndDate);

  const resultArray = [];
  if (attendancesReport.length > 0) {
    for await (const student of attendancesReport) {
      const { studentId, totalAbsentOne, totalPresentOne, totalAbsentTwo, totalPresentTwo } = student?.dataValues;
      const result = await studentService.getStudent(student.studentId);
      resultArray.push({
        studentId: studentId,
        studentName: result?.fullName,
        studentFatherName: result?.fatherName,
        studentGrandFatherName: result?.grandFatherName,
        totalAbsentOne: totalAbsentOne,
        totalPresentOne: totalPresentOne,
        totalAbsentTwo: totalAbsentTwo,
        totalPresentTwo: totalPresentTwo,
      });
    }
  }

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'attendance.xlsx');
  const header = `د  ${subject.name} مضمون د حاضری راپور`;
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.getRow(1).getCell(1).value = header;

  let row = 2;
  resultArray.forEach((element) => {
    const {
      studentId,
      studentName,
      studentFatherName,
      studentGrandFatherName,
      totalAbsentOne,
      totalPresentOne,
      totalAbsentTwo,
      totalPresentTwo,
    } = element;

    row++;
    let col = 1;
    worksheet.getRow(row).getCell(col).value = studentId;
    col++;
    worksheet.getRow(row).getCell(col).value = studentName;
    col++;
    worksheet.getRow(row).getCell(col).value = studentFatherName;
    col++;
    worksheet.getRow(row).getCell(col).value = studentGrandFatherName;
    col++;
    worksheet.getRow(row).getCell(col).value = totalPresentOne;
    col++;
    worksheet.getRow(row).getCell(col).value = totalAbsentOne;
    col++;
    worksheet.getRow(row).getCell(col).value = totalPresentTwo;
    col++;
    worksheet.getRow(row).getCell(col).value = totalAbsentTwo;
  });

  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  getSubjects,
  getSubject,
  createReport,
  deleteSubject,
  createSubject,
  getSemesterStudents,
  getTeacherSubjects,
  updatedSubject,
  assignSubjectToTeacher,
  takeBackSubjectFromTeacher,
};
