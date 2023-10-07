const httpStatus = require('http-status');
const Excel = require('exceljs');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const { shokaListService, studentService, taajilService } = require('../services');
const ApiError = require('../utils/ApiError');
const { marksFormatter } = require('../utils/marks.formatter');
const { isRepeatSemester, checkStudentMahromiatBySemesterId } = require('../utils/global');

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
        const { subjectName, subjectId, subjectCredit } = element;
        const isRegister = resultArray.find((elem) => elem.subjectId === subjectId);
        if (!isRegister) {
          const ob = { subjectId, subjectName, subjectCredit };
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
  const school = await studentService.getStudentSchool(studentId);
  const monograph = await studentService.getStudentMonograph(studentId);



  const conditions = [`shokalist.deletedAt IS NULL`, `shokalist.studentId = ${studentId}`];

  // get student all marks
  let studentMarks = [];
  const studentMarksFirstCheck = await shokaListService.getStudentMarks(conditions);
  const semesterIds = [];
  studentMarksFirstCheck.forEach(item => {
    const id = item?.semesterId;
    const consistId = semesterIds.find(item => item === id);
    if (!consistId) {
      semesterIds.push(id);
    }
  });

  const semestersToBeSkipped = [];

  for await (const id of semesterIds) {
    const isFailed = await isRepeatSemester(studentId, id);
    const { isMahrom } = await checkStudentMahromiatBySemesterId(studentId, id);

    if (isFailed || isMahrom) {
      semestersToBeSkipped.push(id);
    }
  }

  studentMarksFirstCheck.forEach(item => {
    const { semesterId } = item;
    const toSkip = semestersToBeSkipped.find(itemId => itemId === semesterId);
    if (!toSkip) {
      studentMarks.push(item);
    }
  });

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
  const firstSemStartDate = firstSemester?.firstHalfStart || 1401;
  const firstSemEndDate = firstSemester?.firstHalfEnd || 1401;

  // second semester
  const secondSemester = formattedMarks.find((element) => element.semesterTitle === 2);
  // second semester start and end date
  const secondSemStartDate = secondSemester?.SecondHalfStart || 1401;
  const secondSemEndDate = secondSemester?.SecondHalfEnd || 1401;

  // third semester
  const thirdSemester = formattedMarks.find((element) => element.semesterTitle === 3);
  // third semester start and end date
  const thirdSemStartDate = thirdSemester?.firstHalfStart || 1401;
  const thirdSemEndDate = thirdSemester?.firstHalfEnd || 1401;

  // fourth semester
  const fourthSemester = formattedMarks.find((element) => element.semesterTitle === 4);
  // fourth semester start and end date
  const fourthSemStartDate = fourthSemester?.SecondHalfStart || 1401;
  const fourthSemEndDate = fourthSemester?.SecondHalfEnd || 1401;

  // fifth semester
  const fifthSemester = formattedMarks.find((element) => element.semesterTitle === 5);
  // fifth semester start and end date
  const fifthSemStartDate = fifthSemester?.firstHalfStart || 1401;
  const fifthSemEndDate = fifthSemester?.firstHalfEnd || 1401;

  // six semester
  const sixthSemester = formattedMarks.find((element) => element.semesterTitle === 6);
  // sixth semester start and end date
  const sixthSemStartDate = sixthSemester?.SecondHalfStart || 1401;
  const sixthSemEndDate = sixthSemester?.SecondHalfEnd || 1401;

  // six semester
  const seventhSemester = formattedMarks.find((element) => element.semesterTitle === 7);
  // seven semester start and end date
  const seventhSemStartDate = seventhSemester?.firstHalfStart || 1401;
  const seventhSemEndDate = seventhSemester?.firstHalfEnd || 1401;

  // eight semester
  const eightSemester = formattedMarks.find((element) => element.semesterTitle === 6);
  // eight semester start and end date
  const eightSemStartDate = eightSemester?.SecondHalfStart || 1401;
  const eightSemEndDate = eightSemester?.SecondHalfEnd || 1401;

  // find student taajil
  const studentTajil = await taajilService.findTaajilByStudentId(studentId);


  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', '2023-Graduation.xlsx');

  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Graduation');
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
  worksheet.getRow(10).getCell(31).value = student.dob;
  worksheet.getRow(11).getCell(31).value = student.birthCity;



  worksheet.getRow(2).getCell(22).value = student.kankorType;
  // remaining parts;
  // worksheet.getRow(3).getCell(22).value = student;
  // worksheet.getRow(3).getCell(22).value = student;
  worksheet.getRow(4).getCell(22).value = student.admissionYear;


  // school and monograph
  worksheet.getRow(3).getCell(6).value = school?.name;
  worksheet.getRow(5).getCell(6).value = school?.graduationDate;
  worksheet.getRow(6).getCell(6).value = student.kankorId;
  worksheet.getRow(7).getCell(6).value = student.kankorMarks;
  worksheet.getRow(8).getCell(1).value = monograph?.researchTitle;
  worksheet.getRow(10).getCell(1).value = monograph?.defenseDate;
  worksheet.getRow(11).getCell(1).value = student.phoneNumber;


  let col;
  let column;
  let row;
  let rowNumber;
  let i = 0;
  let marks = [];
  while (i < 8) {
    if (i === 0) {
      // set header of first semester
      const semesterTitle = `اول سميسټر( ${firstSemEndDate}-${firstSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(13).getCell(27).value = semesterTitle;
      marks = [...firstSemesterMarks];
      column = col = 34;
      rowNumber = row = 14;
    } else if (i === 1) {
      // set header of first semester
      const semesterTitle = `دوهم سميسټر( ${secondSemEndDate}-${secondSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(13).getCell(19).value = semesterTitle;
      marks = [...secondSemesterMarks];
      column = col = 26;
      rowNumber = row = 14;
    } else if (i === 2) {
      // set header of first semester
      const semesterTitle = `دریم سميسټر( ${thirdSemEndDate}-${thirdSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(13).getCell(11).value = semesterTitle;
      marks = [...thirdSemesterMarks];
      column = col = 18;
      rowNumber = row = 14;
    } else if (i === 3) {
      // set header of first semester
      const semesterTitle = `څلورم سميسټر( ${fourthSemEndDate}-${fourthSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(13).getCell(1).value = semesterTitle;
      marks = [...fourthSemesterMarks];
      column = col = 8;
      rowNumber = row = 14;
    } else if (i === 4) {
      // set header of first semester
      const semesterTitle = `پنڅم سميسټر( ${fifthSemEndDate}-${fifthSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(29).getCell(27).value = semesterTitle;
      marks = [...fifthSemesterMarks];
      column = col = 34;
      rowNumber = row = 30;
    } else if (i === 5) {
      // set header of first semester
      const semesterTitle = `ښپیږم سميسټر( ${sixthSemEndDate}-${sixthSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(29).getCell(19).value = semesterTitle;
      marks = [...sixthSemesterMarks];
      column = col = 26;
      rowNumber = row = 30;
    } else if (i === 6) {
      // set header of first semester
      const semesterTitle = `اووم سميسټر( ${seventhSemEndDate}-${seventhSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(29).getCell(11).value = semesterTitle;
      marks = [...seventhSemesterMarks];
      column = col = 18;
      rowNumber = row = 30;
    } else if (i === 7) {
      // set header of first semester
      const semesterTitle = `اتم سميسټر( ${eightSemEndDate}-${eightSemStartDate}ل.) تحصيلي کال`;
      worksheet.getRow(29).getCell(1).value = semesterTitle;
      marks = [...eightSemesterMarks];
      column = col = 8;
      rowNumber = row = 30;
    }

    marks.forEach((element) => {
      ++row;
      const { subjectName, subjectCredit, firstChance, secondChance, thirdChance, fourthChance } = element;
      worksheet.getRow(row).getCell(col).value = subjectName;
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

    i++;
  }

  const now = Date.now().toLocaleString();
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  createTranscript,
};
