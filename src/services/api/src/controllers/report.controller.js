const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { getSemesterTitleByPashto, getStatsBySemesterId } = require('../utils/semesters');
const Excel = require('exceljs');
const path = require('path');
const { semesterService, educationalYearService } = require('../services');
const { translateFields } = require('../utils/global');

const getConversionReport = catchAsync(async (req, res) => {
  const { type, semesterId } = req.query;

  const { title, educationalYearId } = await semesterService.findSemesterById(semesterId);
  const { year } = await educationalYearService.getEducationalYear(educationalYearId);

  let { className, semesterName } = getSemesterTitleByPashto(title);

  let typeTranslate = translateFields(type);

  const headerText = `د  کمپيوټر ساينس پوهنځي د (${year}) تحصیلی کال  د ( ${className}) ټولګی  د  (${semesterName}) سمستر د  (${typeTranslate}) محصلينو  لیست`;

  const footerText = `په پورته شرح د (   ${className}     ) ټولګی د ${semesterName} سمسټر ${1401} تحصیلي کال دنمرو شقه بدون د قلم وهنی او تراش څخه تر تيب او صحت لري.`;

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'conversion.xlsx');

  // Start generating report
  const semester = await semesterService.findSemesterById(semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'Semester Not Found');

  const maleStatsReport = await getStatsBySemesterId(semesterId, 'male', false);
  const femaleStatsReport = await getStatsBySemesterId(semesterId, 'female', false);

  const results = [...maleStatsReport[type], ...femaleStatsReport[type]];

  // workbook.xlsx.write(res);
  // res.end();
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  let worksheet = workbook.getWorksheet('Sheet2');

  worksheet.getRow(2).getCell(1).value = headerText;

  let row = 5;
  let col = 9;

  results.forEach((student) => {
    // File Headers are as follow:
    // 1. KankorId, Name, FatherName, GFatherName, Gender, Province, Class, Semester, Notes
    let { kankorId, fullName, fatherName, grandFatherName, gender, province } = student;
    gender = translateFields(gender);

    let fields = [kankorId, fullName, fatherName, grandFatherName, gender, province, className, semesterName];

    for (let i = 0; i < 8; i++) {
      worksheet.getRow(row).getCell(col - i).value = fields[i];
    }

    // Change to next row
    row++;
  });

  const now = Date.now();
  // worksheet.getRow(107).getCell(1).value = footerText;
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  getConversionReport,
};
