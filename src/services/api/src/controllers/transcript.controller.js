const httpStatus = require('http-status');
const Excel = require('exceljs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const {
  shokaListService,
  studentService,
  taajilService,
  studentListService,
  educationalYearService,
} = require('../services');
const ApiError = require('../utils/ApiError');
const { marksFormatter } = require('../utils/marks.formatter');
const { toPashtoDigits } = require('../utils/global');

const reFormatMarks = (allMarks, key) => {
  // semesters array
  const semesters = {
    [key]: { semesterSubject: [] },
  };

  allMarks.forEach((element) => {
    semesters[element?.semesterTitle]?.semesterSubject.push(element);
  });

  const resultArray = [];
  for (const key in semesters) {
    if (semesters[key].semesterSubject.length > 0) {
      const subjects = [...semesters[key].semesterSubject];
      semesters[key].semesterSubject.filter((element) => {
        const { subjectName, subjectPashtoName, subjectId, subjectCredit, subjectCodeNumber } = element;
        const isRegister = resultArray.find((elem) => elem.subjectId === subjectId);
        if (!isRegister) {
          const ob = { subjectId, subjectName, subjectPashtoName, subjectCredit, subjectCodeNumber };
          if (element.chance === 1) {
            const secondChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 2);
            const thirdChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 3);
            const fourthChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 4);
            if (secondChance) {
              ob.secondChance = secondChance.totalMarks;
            } else {
              ob.secondChance = null;
            }

            if (thirdChance) {
              ob.thirdChance = thirdChance.totalMarks;
            } else {
              ob.thirdChance = null;
            }

            if (fourthChance) {
              ob.fourthChance = fourthChance.totalMarks;
            } else {
              ob.fourthChance = null;
            }
            ob.firstChance = element.totalMarks;
          } else if (element.chance === 2) {
            const firstChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 1);
            const thirdChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 3);
            const fourthChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 4);
            if (firstChance) {
              ob.firstChance = firstChance.totalMarks;
            } else {
              ob.firstChance = null;
            }

            if (thirdChance) {
              ob.thirdChance = thirdChance.totalMarks;
            } else {
              ob.thirdChance = null;
            }

            if (fourthChance) {
              ob.fourthChance = fourthChance.totalMarks;
            } else {
              ob.fourthChance = null;
            }
            ob.secondChance = element.totalMarks;
          } else if (element.chance === 3) {
            const secondChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 2);
            const firstChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 1);
            const fourthChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 4);
            if (secondChance) {
              ob.secondChance = secondChance.totalMarks;
            } else {
              ob.secondChance = null;
            }

            if (firstChance) {
              ob.firstChance = firstChance.totalMarks;
            } else {
              ob.firstChance = null;
            }

            if (fourthChance) {
              ob.fourthChance = fourthChance.totalMarks;
            } else {
              ob.fourthChance = null;
            }
            ob.thirdChance = element.totalMarks;
          } else if (element.chance === 4) {
            const firstChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 1);
            const secondChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 2);
            const thirdChance = subjects.find((elem) => elem.subjectId === subjectId && elem.chance === 3);
            if (secondChance) {
              ob.secondChance = secondChance.totalMarks;
            } else {
              ob.secondChance = null;
            }

            if (firstChance) {
              ob.firstChance = firstChance.totalMarks;
            } else {
              ob.firstChance = null;
            }

            if (thirdChance) {
              ob.thirdChance = thirdChance.totalMarks;
            } else {
              ob.thirdChance = null;
            }
            ob.fourthChance = element.totalMarks;
          }
          resultArray.push(ob);
        }
      });
    }
  }
  return resultArray;
};

const createTranscript = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const school = {
    name: student?.schoolName,
    graduationDate: student?.schoolGraduationYear,
  };

  const monograph = {
    researchTitle: student?.monographTitle,
    defenseDate: student?.monographDefenseDate,
  };

  const conditions = [`shokalist.deletedAt IS NULL`, `shokalist.studentId = ${studentId}`];

  // get student all marks
  const studentMarks = await shokaListService.getStudentMarks(conditions);
  // format students marks
  const formattedMarks = marksFormatter(studentMarks);
  // make format for transcript
  const firstSemesterMarks = reFormatMarks(formattedMarks, 1);
  const secondSemesterMarks = reFormatMarks(formattedMarks, 2);
  const thirdSemesterMarks = reFormatMarks(formattedMarks, 3);
  const fourthSemesterMarks = reFormatMarks(formattedMarks, 4);
  const fifthSemesterMarks = reFormatMarks(formattedMarks, 5);
  const sixthSemesterMarks = reFormatMarks(formattedMarks, 6);
  const seventhSemesterMarks = reFormatMarks(formattedMarks, 7);
  const eightSemesterMarks = reFormatMarks(formattedMarks, 8);

  // check is student is graduated and has all eight semester marks;
  // if (firstSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have first semester marks');
  // if (secondSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have second semester marks');
  // if (thirdSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have third semester marks');
  // if (fourthSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have fourth semester marks');
  // if (fifthSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have fifth semester marks');
  // if (sixthSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have sixth semester marks');
  // if (seventhSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have seven semester marks');
  // if (eightSemesterMarks.length === 0)
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Student does not have eight semester marks');

  // first semester
  const firstSemester = formattedMarks.find((element) => element.semesterTitle === 1);
  // first semester start and end date
  const firstSemStartDate = firstSemester?.firstHalfStart || 0;
  const firstSemStartDateE = firstSemester?.firstHalfStartP || 0;
  const firstSemEndDate = firstSemester?.firstHalfEnd || 0;
  const firstSemEndDateE = firstSemester?.firstHalfEndP || 0;

  // second semester
  const secondSemester = formattedMarks.find((element) => element.semesterTitle === 2);
  // second semester start and end date
  const secondSemStartDate = secondSemester?.SecondHalfStart || 0;
  const secondSemStartDateE = secondSemester?.SecondHalfStartP || 0;
  const secondSemEndDate = secondSemester?.SecondHalfEnd || 0;
  const secondSemEndDateE = secondSemester?.SecondHalfEndP || 0;

  // third semester
  const thirdSemester = formattedMarks.find((element) => element.semesterTitle === 3);
  // third semester start and end date
  const thirdSemStartDate = thirdSemester?.firstHalfStart || 0;
  const thirdSemStartDateE = thirdSemester?.firstHalfStartP || 0;
  const thirdSemEndDate = thirdSemester?.firstHalfEnd || 0;
  const thirdSemEndDateE = thirdSemester?.firstHalfEndP || 0;

  // fourth semester
  const fourthSemester = formattedMarks.find((element) => element.semesterTitle === 4);
  // fourth semester start and end date
  const fourthSemStartDate = fourthSemester?.SecondHalfStart || 0;
  const fourthSemStartDateE = fourthSemester?.SecondHalfStartP || 0;
  const fourthSemEndDate = fourthSemester?.SecondHalfEnd || 0;
  const fourthSemEndDateE = fourthSemester?.SecondHalfEndP || 0;

  // fifth semester
  const fifthSemester = formattedMarks.find((element) => element.semesterTitle === 5);
  // fifth semester start and end date
  const fifthSemStartDate = fifthSemester?.firstHalfStart || 0;
  const fifthSemStartDateE = fifthSemester?.firstHalfStartP || 0;
  const fifthSemEndDate = fifthSemester?.firstHalfEnd || 0;
  const fifthSemEndDateE = fifthSemester?.firstHalfEndP || 0;

  // six semester
  const sixthSemester = formattedMarks.find((element) => element.semesterTitle === 6);
  // sixth semester start and end date
  const sixthSemStartDate = sixthSemester?.SecondHalfStart || 0;
  const sixthSemStartDateE = sixthSemester?.SecondHalfStartP || 0;
  const sixthSemEndDate = sixthSemester?.SecondHalfEnd || 0;
  const sixthSemEndDateE = sixthSemester?.SecondHalfEndP || 0;

  // six semester
  const seventhSemester = formattedMarks.find((element) => element.semesterTitle === 7);
  // seven semester start and end date
  const seventhSemStartDate = seventhSemester?.firstHalfStart || 0;
  const seventhSemStartDateE = seventhSemester?.firstHalfStartP || 0;
  const seventhSemEndDate = seventhSemester?.firstHalfEnd || 0;
  const seventhSemEndDateE = seventhSemester?.firstHalfEndP || 0;

  // eight semester
  const eightSemester = formattedMarks.find((element) => element.semesterTitle === 8);
  // eight semester start and end date
  const eightSemStartDate = eightSemester?.SecondHalfStart || 0;
  const eightSemStartDateE = eightSemester?.SecondHalfStartP || 0;
  const eightSemEndDate = eightSemester?.SecondHalfEnd || 0;
  const eightSemEndDateE = eightSemester?.SecondHalfEndP || 0;

  // find student taajil
  const studentTajil = await taajilService.findTaajilByStudentId(studentId);

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', '2023-Graduation.xlsx');

  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Graduation');
  const worksheetE = workbook.getWorksheet('English Transcript');
  const worksheetP = workbook.getWorksheet('Pashto Transcript');
  worksheet.getRow(1).getCell(27).value = student.engName;
  worksheet.getRow(3).getCell(27).value = student.engLastName;
  worksheet.getRow(5).getCell(27).value = student.engFatherName;
  worksheet.getRow(7).getCell(27).value = student.engGrandFatherName;
  worksheet.getRow(9).getCell(27).value = student.tazkeraNumber;
  worksheet.getRow(10).getCell(27).value = student.engDob;
  worksheet.getRow(11).getCell(27).value = student.birthCityEnglish;

  worksheet.getRow(1).getCell(31).value = student.fullName;
  worksheet.getRow(3).getCell(31).value = student.nickName;
  worksheet.getRow(5).getCell(31).value = student.fatherName;
  worksheet.getRow(7).getCell(31).value = student.grandFatherName;
  // worksheet.getRow(10).getCell(31).value = student.dob;
  worksheet.getRow(11).getCell(31).value = student.birthCity;

  const kankorType = student?.kankorType === 'general' ? 'عمومي' : 'اختصاصي';

  worksheet.getRow(2).getCell(22).value = kankorType;
  // remaining parts;
  // worksheet.getRow(3).getCell(22).value = student;
  // worksheet.getRow(3).getCell(22).value = student;
  worksheet.getRow(3).getCell(22).value = student.admissionYear;

  const studentSemesters = await studentListService.findAllStudentListOfSingleStudent(student.id);
  if (studentSemesters.length != 0) {
    // First year
    const yearId = studentSemesters[0]?.Semester.educationalYearId;
    const { firstHalfStart: firstSemesterYear, firstHalfStartP: firstSemesterYearP } =
      await educationalYearService.getEducationalYear(yearId);

    // Attach it pashto and english transcript
    worksheet.getRow(4).getCell(22).value = firstSemesterYear;
    worksheetE.getRow(10).getCell(3).value = firstSemesterYearP;

    // Latest semester year
    const latestSemester = studentSemesters[studentSemesters.length - 1]?.Semester;
    if (latestSemester.title == 8) {
      const yearId = studentSemesters[studentSemesters.length - 1]?.Semester.educationalYearId;
      const { SecondHalfEnd: latestSemesterYear, SecondHalfEndP: latestSemesterYearP } =
        await educationalYearService.getEducationalYear(yearId);

      // Attach it pashto and english transcript
      worksheet.getRow(8).getCell(22).value = latestSemesterYear;
      worksheetE.getRow(10).getCell(12).value = latestSemesterYearP;
    }
  }

  // Attach Taajil Year
  const allTaajils = await taajilService.findStudentAllTajils(student.id);
  if (allTaajils.length != 0) {
    worksheet.getRow(5).getCell(22).value = allTaajils[0].year;
  } else {
    worksheet.getRow(5).getCell(22).value = 0;
  }

  // Repeat Semester and Mahromiat Years

  // school and monograph
  worksheet.getRow(3).getCell(6).value = school?.name;
  worksheet.getRow(5).getCell(6).value = school?.graduationDate;
  worksheet.getRow(6).getCell(6).value = student.kankorId;
  worksheet.getRow(7).getCell(6).value = student.kankorMarks;
  worksheet.getRow(8).getCell(1).value = monograph?.researchTitle;
  worksheet.getRow(10).getCell(1).value = monograph?.defenseDate;
  worksheet.getRow(11).getCell(1).value = '0' + student.phoneNumber;

  let col;
  let column;
  let row;
  let rowNumber;
  let i = 0;
  let marks = [];

  // Here, we should attach subject Code Number in english transcript
  let columnE;
  let rowE;

  // Location of semesters date (miladi - english transcript)

  let yearTitle = ' ACADEMIC YEAR ';
  while (i < 8) {
    if (i === 0) {
      // set header of first semester
      if (firstSemStartDate != firstSemEndDate) {
        var semesterTitle = `اول سميسټر( ${toPashtoDigits(firstSemEndDate)}-${toPashtoDigits(
          firstSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `اول سميسټر( ${toPashtoDigits(firstSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(13).getCell(27).value = semesterTitle;
      worksheetP.getRow(10).getCell(25).value = semesterTitle;
      marks = [...firstSemesterMarks];
      column = col = 34;
      rowNumber = row = 14;

      // English Transcript starting subject code numbers start
      columnE = 1;
      rowE = 15;
    } else if (i === 1) {
      // set header of first semester

      if (secondSemEndDate != secondSemStartDate) {
        var semesterTitle = `دوهم سميسټر( ${toPashtoDigits(secondSemEndDate)}-${toPashtoDigits(
          secondSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `دوهم سميسټر( ${toPashtoDigits(secondSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(13).getCell(19).value = semesterTitle;
      worksheetP.getRow(10).getCell(17).value = semesterTitle;
      marks = [...secondSemesterMarks];
      column = col = 26;
      rowNumber = row = 14;

      // English Transcript starting subject code numbers start
      columnE = 10;
      rowE = 15;
    } else if (i === 2) {
      // set header of first semester
      // const semesterTitle = `دریم سميسټر( ${thirdSemEndDate}-${thirdSemStartDate}ل.) تحصيلي کال`;

      if (thirdSemEndDate != thirdSemStartDate) {
        var semesterTitle = `دریم سميسټر( ${toPashtoDigits(thirdSemEndDate)}-${toPashtoDigits(
          thirdSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `دریم سميسټر( ${toPashtoDigits(thirdSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(13).getCell(11).value = semesterTitle;
      worksheetP.getRow(10).getCell(9).value = semesterTitle;

      marks = [...thirdSemesterMarks];
      column = col = 18;
      rowNumber = row = 14;

      // English Transcript starting subject code numbers start
      columnE = 1;
      rowE = 30;
    } else if (i === 3) {
      // set header of first semester
      // const semesterTitle = `څلورم سميسټر( ${fourthSemEndDate}-${fourthSemStartDate}ل.) تحصيلي کال`;

      if (fourthSemEndDate != fourthSemStartDate) {
        var semesterTitle = `څلورم سميسټر( ${toPashtoDigits(fourthSemEndDate)}-${toPashtoDigits(
          fourthSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `څلورم سميسټر( ${toPashtoDigits(fourthSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(13).getCell(1).value = semesterTitle;
      worksheetP.getRow(10).getCell(1).value = semesterTitle;
      marks = [...fourthSemesterMarks];
      column = col = 8;
      rowNumber = row = 14;

      // English Transcript starting subject code numbers start
      columnE = 10;
      rowE = 30;
    } else if (i === 4) {
      // set header of 5th semester
      // const semesterTitle = `پنڅم سميسټر( ${fifthSemEndDate}-${fifthSemStartDate}ل.) تحصيلي کال`;

      if (fifthSemEndDate != fifthSemStartDate) {
        var semesterTitle = `پنڅم سميسټر( ${toPashtoDigits(fifthSemEndDate)}-${toPashtoDigits(
          fifthSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `پنڅم سميسټر( ${toPashtoDigits(fifthSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(29).getCell(27).value = semesterTitle;
      worksheetP.getRow(26).getCell(25).value = semesterTitle;

      marks = [...fifthSemesterMarks];
      column = col = 34;
      rowNumber = row = 30;

      // English Transcript starting subject code numbers start
      columnE = 1;
      rowE = 45;
    } else if (i === 5) {
      // set header of first semester
      // const semesterTitle = `ښپیږم سميسټر( ${sixthSemEndDate}-${sixthSemStartDate}ل.) تحصيلي کال`;

      if (sixthSemEndDate != sixthSemStartDate) {
        var semesterTitle = `ښپیږم سميسټر( ${toPashtoDigits(sixthSemEndDate)}-${toPashtoDigits(
          sixthSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `ښپیږم سميسټر( ${toPashtoDigits(sixthSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(29).getCell(19).value = semesterTitle;
      worksheetP.getRow(26).getCell(17).value = semesterTitle;

      marks = [...sixthSemesterMarks];
      column = col = 26;
      rowNumber = row = 30;

      // English Transcript starting subject code numbers start
      columnE = 10;
      rowE = 45;
    } else if (i === 6) {
      // set header of first semester
      // const semesterTitle = `اووم سميسټر( ${seventhSemEndDate}-${seventhSemEndDate}ل.) تحصيلي کال`;

      if (seventhSemStartDate != seventhSemEndDate) {
        var semesterTitle = `اووم سميسټر( ${toPashtoDigits(seventhSemEndDate)}-${toPashtoDigits(
          seventhSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `اووم سميسټر( ${toPashtoDigits(seventhSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(29).getCell(11).value = semesterTitle;
      worksheetP.getRow(26).getCell(9).value = semesterTitle;

      marks = [...seventhSemesterMarks];
      column = col = 18;
      rowNumber = row = 30;

      // English Transcript starting subject code numbers start
      columnE = 1;
      rowE = 60;
    } else if (i === 7) {
      // set header of first semester
      // const semesterTitle = `اتم سميسټر( ${eightSemEndDate}-${eightSemStartDate}ل.) تحصيلي کال`;

      if (eightSemEndDate != eightSemStartDate) {
        var semesterTitle = `اتم سميسټر( ${toPashtoDigits(eightSemEndDate)}-${toPashtoDigits(
          eightSemStartDate
        )} ل.) تحصيلي کال`;
      } else {
        var semesterTitle = `اتم سميسټر( ${toPashtoDigits(eightSemStartDate)} ل.) تحصيلي کال`;
      }

      worksheet.getRow(29).getCell(1).value = semesterTitle;
      worksheetP.getRow(26).getCell(1).value = semesterTitle;

      marks = [...eightSemesterMarks];
      column = col = 8;
      rowNumber = row = 30;

      // English Transcript starting subject code numbers start
      columnE = 10;
      rowE = 60;
    }

    marks.forEach((element) => {
      ++row;
      const { subjectName, subjectPashtoName, subjectCredit, firstChance, secondChance, thirdChance, fourthChance } =
        element;
      worksheet.getRow(row).getCell(col).value = subjectPashtoName;
      --col;
      worksheet.getRow(row).getCell(col).value = subjectCredit;
      --col;
      worksheet.getRow(row).getCell(col).value = firstChance;
      --col;
      worksheet.getRow(row).getCell(col).value = secondChance;
      --col;
      worksheet.getRow(row).getCell(col).value = thirdChance;
      --col;
      worksheet.getRow(row).getCell(col).value = fourthChance;
      col = column;
    });

    // Attach subjects code numbers into English transcript worksheet
    marks.forEach((element) => {
      const { subjectCodeNumber, subjectName } = element;
      worksheetE.getRow(rowE).getCell(columnE).value = subjectCodeNumber;
      worksheetE.getRow(rowE).getCell(1 + columnE).value = subjectName;
      rowE++;
    });

    i++;
  }

  // Attach educational year as miladi to english transcript
  // 1-2
  worksheetE.getRow(12).getCell(1).value = `ACADEMIC YEAR ${firstSemStartDateE}-${secondSemEndDateE}`;
  // 3-4
  worksheetE.getRow(27).getCell(1).value = `ACADEMIC YEAR ${thirdSemStartDateE}-${fourthSemEndDateE}`;
  // 5-6
  worksheetE.getRow(42).getCell(1).value = `ACADEMIC YEAR ${fifthSemStartDateE}-${sixthSemEndDateE}`;
  // 7-8
  worksheetE.getRow(57).getCell(1).value = `ACADEMIC YEAR ${seventhSemStartDateE}-${eightSemEndDateE}`;

  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  createTranscript,
};
