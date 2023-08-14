const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shokaListService, educationalYearService, studentListService, semesterService } = require('../services');
const ApiError = require('../utils/ApiError');
const { marksFormatter } = require('../utils/marks.formatter');
const Excel = require('exceljs');
const path = require('path');

const createBadliAshaFile = catchAsync(async (req, res) => {
  const { year, classTitle } = req.query;
  const educationalYear = await educationalYearService.getEducationalYearByValue(year);
  if (!educationalYear) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');

  const conditions = [`shokalist.deletedAt IS NULL`, `semester.educationalYearId = ${educationalYear.id}`];
  let semTitleOne;
  let semTitleTwo;

  let className;
  if (classTitle) {
    switch (classTitle) {
      case 1:
        semTitleOne = 1;
        semTitleTwo = 2;
        className = 'لومړی';
        conditions.push(`(semester.title = 1 OR semester.title = 2)`);
        break;
      case 2:
        semTitleOne = 3;
        semTitleTwo = 4;
        className = 'دوهم';
        conditions.push(`(semester.title = 3 OR semester.title = 4)`);
        break;
      case 3:
        semTitleOne = 5;
        semTitleTwo = 6;
        className = 'دریم';
        conditions.push(`(semester.title = 5 OR semester.title = 6)`);
        break;
      case 4:
        semTitleOne = 7;
        semTitleTwo = 8;
        className = 'څلورم';
        conditions.push(`(semester.title = 7 OR semester.title = 8)`);
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
    };
  };

  const semesterOne = await semesterService.findSemester({ title: semTitleOne, educationalYearId: educationalYear.id });
  const semesterTwo = await semesterService.findSemester({ title: semTitleTwo, educationalYearId: educationalYear.id });
  if (!semesterOne || !semesterTwo) throw new ApiError(httpStatus.NOT_FOUND, 'semesters not found');
  // find students
  const semOneStudents = await studentListService.findSemesterStudents(semesterOne.id);
  const semTwoStudents = await studentListService.findSemesterStudents(semesterTwo.id);

  // check if semesters have students
  if (semOneStudents.length <= 0 && semTwoStudents.length <= 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, `You don't have any student in ${semTitleOne} and ${semTitleTwo} semesters`);
  }

  const students = [];
  semOneStudents.forEach(element => {
    students.push({
      studentId: element.Student.id,
      fullName: element.Student.fullName,
      province: element.Student.province,
      fatherName: element.Student.fatherName,
      accountNumber: element.Student.accountNumber || '0000',
    })
  })
  semTwoStudents.forEach((element) => {
    const isMatch = students.find(item => item.studentId === element.Student.id);
    if (!isMatch) {
      students.push({
        studentId: element.Student.id,
        fullName: element.Student.fullName,
        province: element.Student.province,
        fatherName: element.Student.fatherName,
        accountNumber: element.Student.accountNumber || '0000',
      });
    }
  });


  // result array
  const resultArray = [];
  // for removing in loop
  conditions.push('to be removed');
  conditions.push('to be removed');
  for await (const std of students) {
    let studentMarks = [];
    let chance = 1;
    conditions.pop();
    conditions.pop();
    conditions.push(`shokalist.studentId = ${std.studentId}`);
    conditions.push(`shokalist.chance = ${chance}`);


    // student first chance marks
    const firstChanceMarks = await shokaListService.getStudentMarks(conditions);
    studentMarks = [...firstChanceMarks];
    // student second chance marks
    conditions.pop();
    chance++;
    conditions.push(`shokalist.chance = ${chance}`);
    const secondChanceMarks = await shokaListService.getStudentMarks(conditions);

    if (secondChanceMarks.length >= 1) {
      secondChanceMarks.forEach((element) => {
        const firstChance = firstChanceMarks.find(item => item.subjectId === element.subjectId);
        if (firstChance) {
          studentMarks.forEach((item, index) => {
            if (item.subjectId === firstChance.subjectId) {
              delete studentMarks[index];
            }
          });
          studentMarks.push(element);
        } else {
          studentMarks.push(element);
        }
      });
    }

    // student third chance marks
    conditions.pop();
    chance++;
    conditions.push(`shokalist.chance = ${chance}`);
    const thirdChanceMarks = await shokaListService.getStudentMarks(conditions);

    if (thirdChanceMarks.length >= 1) {
      thirdChanceMarks.forEach((element) => {
        const isMatch = studentMarks.find(item => item?.subjectId === element.subjectId);
        if (isMatch) {
          const { subjectId } = isMatch;
          studentMarks.forEach((element, index) => {
            if (element.subjectId === subjectId) {
              delete studentMarks[index];
            }
          });
          studentMarks.push(element);
        } else {
          studentMarks.push(element);
        }
      });
    };
    const formattedResult = marksFormatter(studentMarks);
    if (formattedResult.length >= 1) {
      const secondLastElement = formattedResult[formattedResult.length - 2];
      const thirdLastElement = formattedResult[formattedResult.length - 3];
      resultArray.push({
        fullName: std.fullName,
        fatherName: std.fatherName,
        province: std.province,
        accountNumber: std.accountNumber,
        semOne: secondLastElement?.percentage || 0,
        semTwo: thirdLastElement?.percentage || 0
      });
    };
  };

  const headerText = `د  کمپيوټر ساينس پوهنځي ( ${className} ) ټولګی د بدل اعاشه محصلينو نوم لړ د ( ${year} )تحصیلی کال د بدل اعاشي د اجرا لپاره`


  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'badliasha.xlsx');

  // workbook.xlsx.write(res);
  // res.end();
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  let worksheet = workbook.getWorksheet('asha');

  worksheet.getRow(2).getCell(2).value = headerText;
  worksheet.getRow(4).getCell(8).value = `سمسټر ${semTitleOne}`;
  worksheet.getRow(4).getCell(7).value = `سمسټر ${semTitleTwo}`;

  let row = 4;
  for (let i = 0; i < resultArray.length; i++) {
    const element = resultArray[i];
    const { fullName, fatherName, accountNumber, province, semOne, semTwo } = element;
    if ((semOne + semTwo) < 65) {
      continue;
    }
    ++row;
    let col = 15;
    worksheet.getRow(row).getCell(col).value = fullName;
    --col;
    worksheet.getRow(row).getCell(col).value = fatherName;
    --col;
    worksheet.getRow(row).getCell(col).value = province;
    --col;
    worksheet.getRow(row).getCell(col).value = accountNumber;
    col = col - 2;
    worksheet.getRow(row).getCell(col).value = className;
    --col;
    worksheet.getRow(row).getCell(col).value = semTitleOne + 2;
    --col;
    worksheet.getRow(row).getCell(col).value = semOne;
    --col;
    worksheet.getRow(row).getCell(col).value = semTwo;
  };
  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});





module.exports = {
  createBadliAshaFile,
};
