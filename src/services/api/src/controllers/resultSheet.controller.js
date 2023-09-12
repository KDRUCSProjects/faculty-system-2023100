const httpStatus = require('http-status');
const Excel = require('exceljs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const {
  shokaListService,
  educationalYearService,
  semesterService,
  studentListService,
  subjectService,
  shokaService,
} = require('../services');
const ApiError = require('../utils/ApiError');

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

const createResultSheet = catchAsync(async (req, res) => {
  const { period } = req.params;
  const periodYear = await educationalYearService.getYearByPeriod(period);
  if (!periodYear) throw new ApiError(httpStatus.NOT_FOUND, 'Period Year Not Found');
  const semesters = [];

  semesters[0] = await semesterService.findSemesterByYearIdAndTitle(periodYear.id, 1);
  semesters[1] = await semesterService.findSemesterByYearIdAndTitle(periodYear.id, 2);

  const secondYearOfPeriod = await educationalYearService.findNextYear(periodYear.year);
  if (secondYearOfPeriod) {
    const thirdSemester = await semesterService.findSemesterByYearIdAndTitle(secondYearOfPeriod.id, 3);
    const fourthSemester = await semesterService.findSemesterByYearIdAndTitle(secondYearOfPeriod.id, 4);
    semesters[2] = thirdSemester;
    semesters[3] = fourthSemester;
    const thirdYearOfPeriod = await educationalYearService.findNextYear(secondYearOfPeriod.year);
    if (thirdYearOfPeriod) {
      const fifthSemester = await semesterService.findSemesterByYearIdAndTitle(thirdYearOfPeriod.id, 5);
      const sixthSemester = await semesterService.findSemesterByYearIdAndTitle(thirdYearOfPeriod.id, 6);
      semesters[4] = fifthSemester;
      semesters[5] = sixthSemester;
      const fourthYearOfPeriod = await educationalYearService.findNextYear(thirdYearOfPeriod.year);
      if (fourthYearOfPeriod) {
        const seventhSemester = await semesterService.findSemesterByYearIdAndTitle(fourthYearOfPeriod.id, 7);
        const eighthSemester = await semesterService.findSemesterByYearIdAndTitle(fourthYearOfPeriod.id, 8);
        semesters[6] = seventhSemester;
        semesters[7] = eighthSemester;
      }
    }
  }

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'ResultsTable.xlsx');

  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);

  for await (const semester of semesters) {
    let row = 12;
    const worksheet = workbook.getWorksheet(`sem${semester.title}`);
    const semesterStudents = await studentListService.findSemesterStudents(semester.id);
    const subjects = await subjectService.getSemesterSubjectsSortedById(semester.id);
    for await (const student of semesterStudents) {
      const studentMarks = [];
      for await (const subject of subjects) {
        const shoka = await shokaService.findShokaBySubjectId(subject.id);
        const conditions = [
          `shokalist.deletedAt IS NULL`,
          `shokalist.shokaId  = ${shoka.id}`,
          `student.id = ${student.studentId}`,
          `semester.id = ${semester.id}`,
        ];
        const subjectMarks = await shokaListService.getStudentMarksSortByName(conditions);
        const formattedMarks = marksFormatter(subjectMarks);
        studentMarks.push(formattedMarks);
      }
      const year = semester?.EducationalYear.year;
      const className = semester.title === 1 ? 'لومړی'
        : semester.title === 2 ? 'دوهم'
          : semester.title === 3 ? 'دریم'
            : semester.title === 4 ? 'څلورم'
              : semester.title === 5 ? 'پنځم'
                : semester.title === 6 ? 'ښپږم'
                  : semester.title === 7 ? 'اووم'
                    : semester.title === 8 ? 'اتم'
                      : '...';

      const headerText = `د ${year} کال د (${className}) سمسټر د نتایجو جدول`
      // write in the excel file
      worksheet.getRow(5).getCell(3).value = headerText;
      row += 3;
      worksheet.getRow(row).getCell(24).value = student.Student.kankorId;
      worksheet.getRow(row).getCell(23).value = student.Student.csId;
      worksheet.getRow(row).getCell(22).value = student.Student.fullName;
      worksheet.getRow(row).getCell(21).value = student.Student.fatherName;

      let marksColumn = 21;
      studentMarks.forEach((elem) => {
        marksColumn -= 2;
        let rowNumber = row;
        worksheet.getRow(rowNumber).getCell(marksColumn).value = elem[1];
        ++rowNumber;
        worksheet.getRow(rowNumber).getCell(marksColumn).value = elem[2];
        ++rowNumber;
        worksheet.getRow(rowNumber).getCell(marksColumn).value = elem[3];
      });
    }

    let col = 20;
    subjects.forEach((elem) => {
      col -= 2;
      worksheet.getRow(12).getCell(col).value = elem.name;
      worksheet.getRow(13).getCell(col).value = elem.credit;
    });
  }

  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  createResultSheet,
};
