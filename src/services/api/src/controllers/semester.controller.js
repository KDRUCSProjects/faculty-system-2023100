const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { semesterService, educationalYearService, subjectService } = require('../services');
const ApiError = require('../utils/ApiError');
const { getStatsBySemesterId } = require('../utils/semesters');

const createSemester = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.body.educationalYearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'Educational Year Not found with this ID');
  const semester = await semesterService.findSemester(req.body);
  if (semester) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Semester is already created');
  const results = await semesterService.createNewSemester(req.body);
  return res.status(httpStatus.CREATED).send(results);
});

const getSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findSemesterById(req.params.semesterId);

  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'Semester Not Found');

  const maleStats = await getStatsBySemesterId(req.params.semesterId, 'male');
  const maleStatsReport = await getStatsBySemesterId(req.params.semesterId, 'male', false);
  const femaleStats = await getStatsBySemesterId(req.params.semesterId, 'female');
  const femaleStatsReport = await getStatsBySemesterId(req.params.semesterId, 'female', false);

  semester.dataValues.statistics = {
    male: maleStats,
    female: femaleStats,
    report: {
      male: maleStatsReport,
      female: femaleStatsReport,
    },
  };

  return res.status(httpStatus.OK).send(semester);
});

const deleteSemester = catchAsync(async (req, res) => {
  const semester = await semesterService.findById(req.params.semesterId);
  if (!semester) throw new ApiError(httpStatus.NOT_FOUND, 'semester not found');
  const subjects = await subjectService.getSemesterStudents(req.params.semesterId);
  if (subjects.length > 0) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'semester has subjects. Delete Subjects First');
  await semesterService.deleteSemester(semester);
  return res.status(httpStatus.NO_CONTENT).send();
});

const getSemesters = catchAsync(async (req, res) => {
  if (req.query?.statistics && req.query?.year) {
    const year = await educationalYearService.getEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
    const semesters = await semesterService.getYearSemesters(year.id);
    const semestersIds = semesters.map((s) => s.id);

    const statistics = [];
    for await (const id of semestersIds) {
      statistics.push({
        male: await getStatsBySemesterId(id, 'male'),
        female: await getStatsBySemesterId(id, 'female'),
      });
    }

    // Only get currentHalf semesters stats for taajil, reentry an reentry
    const { year: currentYear, firstHalf } = await educationalYearService.getCurrentEducationalYear();

    const onGoingSemesters = [];

    const firstSemestersIds = semesters?.filter((s) => s.title % 2 !== 0).map((s) => s.id);
    const secondSemestersIds = semesters?.filter((s) => s.title % 2 === 0).map((s) => s.id);
    const electedSemester = !!firstHalf ? firstSemestersIds : secondSemestersIds;

    for await (const id of electedSemester) {
      onGoingSemesters.push({
        male: await getStatsBySemesterId(id, 'male'),
        female: await getStatsBySemesterId(id, 'female'),
      });
    }

    // Total Male and Female from on-going semesters
    const total = {
      male: onGoingSemesters.map((semester) => semester.male.total).reduce((particalSum, a) => particalSum + a, 0),
      female: onGoingSemesters.map((semester) => semester.female.total).reduce((particalSum, a) => particalSum + a, 0),
    };

    // Total Male and Female from on-going semesters
    const present = {
      male: onGoingSemesters.map((semester) => semester.male.present).reduce((particalSum, a) => particalSum + a, 0),
      female: onGoingSemesters.map((semester) => semester.female.present).reduce((particalSum, a) => particalSum + a, 0),
    };

    // Total Male and Female from on-going semesters
    const taajil = {
      male: onGoingSemesters.map((semester) => semester.male.taajil).reduce((particalSum, a) => particalSum + a, 0),
      female: onGoingSemesters.map((semester) => semester.female.taajil).reduce((particalSum, a) => particalSum + a, 0),
    };

    // Total Male and Female from on-going semesters
    const reentry = {
      male: onGoingSemesters.map((semester) => semester.male.reentry.total).reduce((particalSum, a) => particalSum + a, 0),
      female: onGoingSemesters
        .map((semester) => semester.female.reentry.total)
        .reduce((particalSum, a) => particalSum + a, 0),
    };

    // Total Male and Female from on-going semesters
    const monfaq = {
      male: onGoingSemesters.map((semester) => semester.male.monfaq).reduce((particalSum, a) => particalSum + a, 0),
      female: onGoingSemesters.map((semester) => semester.female.monfaq).reduce((particalSum, a) => particalSum + a, 0),
    };

    const sumOfSemesters = {
      total,
      present,
      taajil,
      monfaq,
      reentry,
    };

    for await (const id of semesters?.map((s) => { }))
      return res.status(httpStatus.OK).send({ year: currentYear, semesters: statistics, onGoingSemesters, sumOfSemesters });
  }

  if (req.query?.year) {
    const year = await educationalYearService.getEducationalYearByValue(req.query.year);
    if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
    const semesters = await semesterService.getYearSemesters(year.id);
    return res.status(httpStatus.OK).send(semesters);
  }

  const semesters = await semesterService.getAllSemesters();
  return res.status(httpStatus.OK).send(semesters);
});

const getConversionReport = catchAsync(async (req, res) => {
  const headerText = `د کمپيوټر ساينس پوهنځي د ${className} ټولګی د ${semesterName} سمسټر د (${subject.name})  مضمون استاد (${teacher.name})   مميز (      )  د ${chance} چانس ازموينی نمري`;
  const footerText = `په پورته شرح د (   ${className}     ) ټولګی د ${semesterName} سمسټر ${year.year} تحصیلي کال دنمرو شقه بدون د قلم وهنی او تراش څخه تر تيب او صحت لري.`;

  const filePath = path.join(__dirname, '../', 'storage', 'exportable', 'templates', 'shoka.xlsx');

  // workbook.xlsx.write(res);
  // res.end();
  let workbook = new Excel.Workbook();
  workbook = await workbook.xlsx.readFile(filePath);
  let worksheet = workbook.getWorksheet('Sheet1');

  worksheet.getRow(4).getCell(1).value = headerText;

  let row = 6;

  const now = Date.now();
  // worksheet.getRow(107).getCell(1).value = footerText;
  const newPath = path.join(__dirname, '../', 'storage', 'files', `${now}.xlsx`);
  await workbook.xlsx.writeFile(newPath);
  return res.download(newPath);
});

module.exports = {
  getSemester,
  getSemesters,
  deleteSemester,
  createSemester,
  getConversionReport,
};
