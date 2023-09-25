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
const { marksFormatter, doesStudentHasWarning } = require('../utils/global');


const doesStudentFailInFirstChance = (marksObject) => {
  const projectMarks = marksObject.projectMarks ? marksObject.projectMarks : 0;
  const assignment = marksObject.assignment ? marksObject.assignment : 0;
  const practicalWork = marksObject.practicalWork ? marksObject.practicalWork : 0;
  const finalMarks = marksObject.finalMarks ? marksObject.finalMarks : 0;
  const totalMarks = projectMarks + assignment + finalMarks + practicalWork;
  if (totalMarks < 55) {
    return true;
  } else {
    return false;
  }
}

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
    let totalRepeatSemester = 0;
    let totalWarnings = 0;
    let totalStrongWarnings = 0;
    let row = 12;

    const worksheet = workbook.getWorksheet(`sem${semester.title}`);
    // write semester header text
    const year = semester?.EducationalYear?.year;
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
    const semesterStudents = await studentListService.findSemesterStudents(semester.id);
    const subjects = await subjectService.getSemesterSubjectsSortedById(semester.id);
    for await (const student of semesterStudents) {
      let totalCredits = 0;
      let failCredits = 0;
      const studentMarks = [];
      let warning = null;
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
          `student.id = ${student.studentId}`,
          `semester.id = ${semester.id}`,
        ];
        const subjectMarks = await shokaListService.getStudentMarksSortByName(conditions);
        // find student first chance marks
        const studentFirstChanceMarks = subjectMarks.find(item => item.chance === 1);
        // check if student is pass in first chance
        if (studentFirstChanceMarks) {
          if (doesStudentFailInFirstChance(studentFirstChanceMarks)) {
            failCredits += credit;
          }
        } else {
          failCredits += credit;
        }
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

      // calculate marks for percentage
      // calculate if student is repeat semester
      if (failCredits > (totalCredits / 2)) {
        totalRepeatSemester++;
        worksheet.getRow(row).getCell(1).value = 'تکرار سمسټر';
      } else if ((totalMarksForPercentage / totalCredits) >= 55 && (totalMarksForPercentage / totalCredits) <= 60) {
        if (semester.title !== 1) {
          const studentAllSemester = await studentListService.findAllStudentListOfSingleStudent(student.studentId);
          const previousSemesterTitle = (semester.title - 1);
          const previousSemester = studentAllSemester.find(item => item.Semester.title === previousSemesterTitle);
          if (doesStudentHasWarning(student.studentId, previousSemester.Semester.id)) {
            worksheet.getRow(row).getCell(1).value = 'کتبی اخطار';
            totalStrongWarnings++;
          } else {
            worksheet.getRow(row).getCell(1).value = 'شفاهی اخطار';
            totalWarnings++;
          }
        } else {
          worksheet.getRow(row).getCell(1).value = 'شفاهی اخطار';
          totalWarnings++;
        }
      }
      // write in file
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
    worksheet.getRow(5).getCell(1).value = totalRepeatSemester;
    worksheet.getRow(6).getCell(1).value = totalWarnings;
    worksheet.getRow(7).getCell(1).value = totalStrongWarnings;
  }

  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  createResultSheet,
};
