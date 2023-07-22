const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  shokaListService,
  shokaService,
  subjectService,
  semesterService,
  studentService,
  studentListService,
  userService,
} = require('../services');
const ApiError = require('../utils/ApiError');
const { marksFormatter } = require('../utils/marks.formatter');
const Excel = require('exceljs');
const path = require('path');
const crypto = require('crypto');

const createShokaList = catchAsync(async (req, res) => {

  const midtermMarks = req.body.midtermMarks || 0;
  const assignment = req.body.assignment || 0;
  const finalMarks = req.body.finalMarks || 0;
  const practicalWork = req.body.practicalWork || 0;
  const totalMarks = (midtermMarks + assignment + finalMarks + practicalWork);

  if (totalMarks > 100) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Total Marks are Above 100');
  }
  const { studentId, subjectId } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  const semester = await semesterService.findSemesterById(subject.semesterId);
  const isStudentListed = await studentListService.findListedStudentByStudentId(studentId);
  if (isStudentListed.length === 0 || (isStudentListed.length >= 1 && !(semester.id === isStudentListed[0]?.semesterId))) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not exists in this semester');
  }
  if (!req.query.chance) {
    const doesStdHasMarks = await shokaListService.isStudentListedInShokaList(shoka.id, studentId, 1);
    if (doesStdHasMarks) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has marks in first chance of this subject and shoka');
    req.body.shokaId = shoka.id;
    const shokaList = await shokaListService.createShokaList(req.body);
    return res.status(httpStatus.CREATED).send(shokaList);

  } else {
    switch (req.query.chance) {
      case 2:
        const studentFirstChanceMarks = await shokaListService.isStudentListedInShokaList(shoka.id, studentId, 1);
        if (!studentFirstChanceMarks) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student does not have first chance marks')
        const midtermMarks = studentFirstChanceMarks.midtermMarks || 0;
        const assignment = studentFirstChanceMarks.assignment || 0;
        const practicalWork = studentFirstChanceMarks.practicalWork || 0;
        const finalMarks = studentFirstChanceMarks.finalMarks || 0;
        const firstChanceTotalMarks = (midtermMarks + assignment + finalMarks + practicalWork);
        if (firstChanceTotalMarks >= 55) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student is pass in first chance')

        req.body.shokaId = shoka.id;
        req.body.chance = 2;
        const firstChanceShokaList = await shokaListService.createShokaList(req.body);
        return res.status(httpStatus.CREATED).send(firstChanceShokaList);

      case 3:
        const studentSecondChanceMarks = await shokaListService.isStudentListedInShokaList(shoka.id, studentId, 2);
        if (!studentSecondChanceMarks) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student does not have second chance marks')
        const secondMidtermMarks = studentSecondChanceMarks.midtermMarks || 0;
        const secondAssignment = studentSecondChanceMarks.assignment || 0;
        const secondPracticalWork = studentSecondChanceMarks.practicalWork || 0;
        const secondFinalMarks = studentSecondChanceMarks.finalMarks || 0;
        const secondChanceTotalMarks = (secondMidtermMarks + secondAssignment + secondPracticalWork + secondFinalMarks);
        if (secondChanceTotalMarks >= 55) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student is pass in second chance')

        req.body.shokaId = shoka.id;
        req.body.chance = 3;
        const secondChanceShokaList = await shokaListService.createShokaList(req.body);
        return res.status(httpStatus.CREATED).send(secondChanceShokaList);
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
    }
  }
});

const getShokaList = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  const results = await shokaListService.getShokaMarks(shoka.id);
  res.status(httpStatus.OK).send(results);
});

const updateShokaList = catchAsync(async (req, res) => {
  const { shokalistId } = req.params;
  const shokaList = await shokaListService.getShokaListById(shokalistId);
  if (!shokaList) throw new ApiError(httpStatus.NOT_FOUND, 'shoka marks not found');
  const results = await shokaListService.updateShokaList(shokaList, req.body);
  res.status(httpStatus.ACCEPTED).send(results);
});


const deleteShokaList = catchAsync(async (req, res) => {
  const { shokalistId } = req.params;
  const shokaList = await shokaListService.getShokaListById(shokalistId);
  if (!shokaList) throw new ApiError(httpStatus.NOT_FOUND, 'shoka marks not found');
  await shokaListService.deleteShokaList(shokaList);
  res.status(httpStatus.NO_CONTENT).send();
});


const getStudentMarks = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  // create conditions for query
  const conditions = [`shokalist.deletedAt IS NULL`, `shokalist.studentId = ${studentId}`];

  if (req.query.semesterId) {
    conditions.push(`semester.id = ${req.query.semesterId}`);
    const results = await shokaListService.getStudentMarks(conditions);
    const formattedMarks = marksFormatter(results);
    return res.status(httpStatus.OK).send(formattedMarks);
  }

  if (req.query?.semester) {
    const { semester } = req.query;
    conditions.push(`semester.title = ${semester}`);
    const results = await shokaListService.getStudentMarks(conditions);
    const formatMarks = marksFormatter(results);
    return res.status(httpStatus.OK).send(formatMarks);
  }

  if (req.query?.class) {
    const classTitle = req.query.class;
    switch (classTitle) {
      case 1:
        conditions.push(`(semester.title = 1 OR semester.title = 2)`)
        break;
      case 2:
        conditions.push(`(semester.title = 3 OR semester.title = 4)`);
        break;
      case 3:
        conditions.push(`(semester.title = 5 OR semester.title = 6)`)
        break;
      case 4:
        conditions.push(`(semester.title = 7 OR semester.title = 8)`)
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
    }
    const results = await shokaListService.getStudentMarks(conditions);
    const formatMarks = marksFormatter(results);
    return res.status(httpStatus.OK).send(formatMarks);
  }

  const results = await shokaListService.getStudentMarks(conditions);
  const formatMarks = marksFormatter(results);
  return res.status(httpStatus.OK).send(formatMarks);

});


const createShokaInExcel = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const semester = await semesterService.findById(subject.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  if (!subject.teacherId) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Subject Should be assign to a teacher');
  const teacher = await userService.getTeacher(subject.teacherId);
  if (!teacher) throw new ApiError(httpStatus.NOT_FOUND, 'teacher not found');
  const conditions = [`shokalist.shokaId = ${shoka.id}`, `shokalist.deletedAt IS NULL`];

  switch (req.query.chance) {
    case 1:
      conditions.push(`shokalist.chance = 1`);
      break;
    case 2:
      conditions.push(`shokalist.chance = 2`);
      break;
    case 3:
      conditions.push(`shokalist.chance = 3`);
      break;
    default:
      throw new ApiError(httpStatus.BAD_REQUEST, 'invalid query parameter');
  };

  const stdMarks = await shokaListService.getSubjectMarks(conditions);

  if (stdMarks.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'shoka is empty');
  }

  let className;
  let semesterName;
  switch (semester.title) {
    case 1:
      className = 'لومړی'
      semesterName = 'اول'
      break;
    case 2:
      className = 'لومړی';
      semesterName = 'دوهم';
      break;
    case 3:
      className = 'دوهم';
      semesterName = 'دریم';
      break;
    case 4:
      className = 'دوهم';
      semesterName = 'څلورم';
      break;
    case 5:
      className = 'دریم';
      semesterName = 'پنځم';
      break;
    case 6:
      className = 'دریم';
      semesterName = 'ښپږم';
      break;
    case 7:
      className = 'څلورم';
      semesterName = 'اووم';
      break;
    case 8:
      className = 'څلورم';
      semesterName = 'اتم';
      break;
    default:
      className = 'لومړی';
      semesterName = 'اول'
      break;
  }
  const { chance } = req.query;
  const headerText = `د کمپيوټر ساينس پوهنځي د ${className} ټولګی د ${semesterName} سمسټر د (${subject.name})  مضمون استاد (${teacher.name})   مميز (      )  د ${chance} چانس ازموينی نمري`

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'shoka.xlsx')


  // workbook.xlsx.write(res);
  // res.end();
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  let worksheet = workbook.getWorksheet('Sheet1');
  worksheet.getRow(4).getCell(1).value = headerText;
  let row = 6;
  stdMarks.forEach(element => {
    const { fullName, fatherName, practicalWork, assignment, midtermMarks, finalMarks } = element;
    ++row;
    let col = 9;
    worksheet.getRow(row).getCell(col).value = fullName;
    --col;
    worksheet.getRow(row).getCell(col).value = fatherName;
    --col;
    worksheet.getRow(row).getCell(col).value = practicalWork;
    --col;
    worksheet.getRow(row).getCell(col).value = assignment;
    --col;
    worksheet.getRow(row).getCell(col).value = midtermMarks;
    --col;
    worksheet.getRow(row).getCell(col).value = finalMarks;
  });
  const now = Date.now();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  deleteShokaList,
  getShokaList,
  createShokaList,
  updateShokaList,
  getStudentMarks,
  createShokaInExcel,
};
