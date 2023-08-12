const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { educationalYearService, semesterService } = require('../services');
const ApiError = require('../utils/ApiError');

const createEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.findEducationalYearByValue(req.body.educationalYear);
  if (year) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Year already created');
  const results = await educationalYearService.createEducationalYear(req.body.educationalYear);
  res.status(httpStatus.CREATED).send(results);
});

const getEducationalYears = catchAsync(async (req, res) => {
  if (req.query?.currentYear) {
    const currentYear = await educationalYearService.getCurrentEducationalYear();
    return res.status(httpStatus.OK).send(currentYear);
  }
  if (req.query.period) {
    const semesters = [];
    const theSemesters = [];
    const periodYear = await educationalYearService.getYearByPeriod(req.query.period);
    if (!periodYear) throw new ApiError(httpStatus.NOT_FOUND, 'Period Year Not Found');
    const firstSemester = await semesterService.findSemesterByYearIdAndTitle(periodYear.id, 1);
    const secondSemester = await semesterService.findSemesterByYearIdAndTitle(periodYear.id, 2);
    theSemesters[0] = firstSemester;
    theSemesters[1] = secondSemester;
    semesters.push({
      [periodYear.year]: {
        1: firstSemester,
        2: secondSemester,
      },
    });
    const secondYearOfPeriod = await educationalYearService.findNextYear(periodYear.year);
    if (secondYearOfPeriod) {
      const thirdSemester = await semesterService.findSemesterByYearIdAndTitle(secondYearOfPeriod.id, 3);
      const fourthSemester = await semesterService.findSemesterByYearIdAndTitle(secondYearOfPeriod.id, 4);
      semesters.push({
        [secondYearOfPeriod.year]: {
          3: thirdSemester,
          4: fourthSemester,
        },
      });
      theSemesters[2] = thirdSemester;
      theSemesters[3] = fourthSemester;
      const thirdYearOfPeriod = await educationalYearService.findNextYear(secondYearOfPeriod.year);
      if (thirdYearOfPeriod) {
        const fifthSemester = await semesterService.findSemesterByYearIdAndTitle(thirdYearOfPeriod.id, 5);
        const sixthSemester = await semesterService.findSemesterByYearIdAndTitle(thirdYearOfPeriod.id, 6);
        semesters.push({
          [thirdYearOfPeriod.year]: {
            5: fifthSemester,
            6: sixthSemester,
          },
        });
        theSemesters[4] = fifthSemester;
        theSemesters[5] = sixthSemester;
        const fourthYearOfPeriod = await educationalYearService.findNextYear(thirdYearOfPeriod.year);
        if (fourthYearOfPeriod) {
          const seventhSemester = await semesterService.findSemesterByYearIdAndTitle(fourthYearOfPeriod.id, 7);
          const eighthSemester = await semesterService.findSemesterByYearIdAndTitle(fourthYearOfPeriod.id, 8);
          semesters.push({
            [fourthYearOfPeriod.year]: {
              7: seventhSemester,
              8: eighthSemester,
            },
          });
          theSemesters[6] = seventhSemester;
          theSemesters[7] = eighthSemester;
        }
      }
    }

    const semestersWithEducationalYear = [];
    for await (let semester of theSemesters) {
      const theYear = await educationalYearService.getEducationalYear(semester.educationalYearId);
      semester.year = theYear.year;
      semestersWithEducationalYear.push(semester);
    }

    console.log(semestersWithEducationalYear);
    return res.status(httpStatus.OK).send({ orderedSemesters: semesters, unorderedSemesters: theSemesters });
  }
  const results = await educationalYearService.getEducationalYears();
  res.status(httpStatus.OK).send(results);
});

const deleteEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.params.yearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  await educationalYearService.deleteEducationalYear(year);
  res.status(httpStatus.NO_CONTENT).send();
});

const getEducationalYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYear(req.params.yearId);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  res.status(httpStatus.OK).send(year);
});

const setDate = catchAsync(async (req, res) => {
  let year = undefined;
  year = await educationalYearService.getEducationalYear(req.params.yearId);
  if (!year) {
    year = await educationalYearService.getEducationalYearByValue(req.params.yearId);
  }
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  const { period } = req.body;
  if (period) {
    const periodYear = await educationalYearService.getYearByPeriod(period);
    if (periodYear) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Period exits');
    }
  }
  const results = await educationalYearService.updateYear(year, req.body);
  return res.status(httpStatus.ACCEPTED).send(results);
});

const getEducationalYearByValue = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYearByValue(req.params.year);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  res.status(httpStatus.OK).send(year);
});

const setCurrentYear = catchAsync(async (req, res) => {
  const year = await educationalYearService.getEducationalYearByValue(req.body.year);
  if (!year) throw new ApiError(httpStatus.NOT_FOUND, 'year not found');
  const currentYear = await educationalYearService.getCurrentEducationalYear();
  if (currentYear && currentYear?.year !== year.year) {
    await educationalYearService.updateYear(currentYear, { onGoing: false });
  }
  if (req.body.firstHalf) {
    const results = await educationalYearService.updateYear(year, { onGoing: true, firstHalf: true, secondHalf: false });
    return res.status(httpStatus.ACCEPTED).send(results);
  }

  if (req.body.secondHalf) {
    const results = await educationalYearService.updateYear(year, { onGoing: true, secondHalf: true, firstHalf: false });
    return res.status(httpStatus.ACCEPTED).send(results);
  }
});

module.exports = {
  setDate,
  setCurrentYear,
  getEducationalYears,
  getEducationalYear,
  deleteEducationalYear,
  createEducationalYear,
  getEducationalYearByValue,
};
