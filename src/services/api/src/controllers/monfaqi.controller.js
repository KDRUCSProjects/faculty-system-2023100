const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  monfaqiService,
  studentService,
  educationalYearService,
  studentListService,
  tabdiliService,
} = require('../services');

const createMonfaqi = catchAsync(async (req, res) => {
  const { studentId, educationalYear } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');

  // Check if student is tabdil or monfaq
  const isTabdil = await tabdiliService.findTabdiliByStudentId(studentId);

  if (isTabdil) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is tabdil!');
  }

  const studentMonfaqi = await monfaqiService.findMonfaqiByStudentId(studentId);
  if (studentMonfaqi) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student already has monfaqi');

  let educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
  if (!educationalYearId) {
    await educationalYearService.createEducationalYear(educationalYear);
  }

  // Get student on-going semester id
  const currentSemesterId = await studentListService.findStudentLatestSemesterId(studentId);
  req.body.semesterId = currentSemesterId;
  req.body.year = educationalYear;

  const monfaqi = await monfaqiService.createMonfaqi(req.body);
  return res.status(httpStatus.CREATED).send(monfaqi);
});

const getMonfaqies = catchAsync(async (req, res) => {
  if (req.query.studentId) {
    const { studentId } = req.query;
    const results = await monfaqiService.findMonfaqiByStudentId(studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Monfaqi Not Found With Student id ${studentId}`);
    return res.status(httpStatus.OK).send(results);
  }
  if (req.query.monfaqiId) {
    const { monfaqiId } = req.query;
    const results = await monfaqiService.findMonfaqiById(monfaqiId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `monfiqi Not Found with id ${monfaqiId}`);
    return res.status(httpStatus.OK).send(results);
  }
  if (req.query.kankorId) {
    const { kankorId } = req.query;
    const results = await monfaqiService.findMonfaqiByStdKankorId(kankorId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `monfaqi Not Found Student With Kankor id ${kankorId}`);
    return res.status(httpStatus.OK).send(results);
  }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  if (req.query.educationalYear) {
    const educationalYearId = await educationalYearService.findEducationalYearByValue(req.query.educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, 'educationalYear not found');
    const { count, rows } = await monfaqiService.findMonfaqiByYearId(limit, offset, educationalYearId);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows,
    });
  }

  const { count, rows } = await monfaqiService.getMonfaqis(limit, offset);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows,
  });
});

const getMonfaqi = catchAsync(async (req, res) => {
  const monfaqi = await monfaqiService.findMonfaqiById(req.params.monfaqiId);
  if (!monfaqi) throw new ApiError(httpStatus.NOT_FOUND, 'monfaqi not found');
  return res.status(httpStatus.OK).send(monfaqi);
});

const deleteMonfaqi = catchAsync(async (req, res) => {
  const monfaqi = await monfaqiService.findMonfaqiById(req.params.monfaqiId);
  if (!monfaqi) throw new ApiError(httpStatus.NOT_FOUND, 'monfaqi not found');
  await monfaqiService.deleteMonfaqi(monfaqi);
  return res.status(httpStatus.NO_CONTENT).send();
});

const updateMonfaqi = catchAsync(async (req, res) => {
  const monfaqi = await monfaqiService.findMonfaqiById(req.params.monfaqiId);
  if (!monfaqi) throw new ApiError(httpStatus.NOT_FOUND, 'monfaqi not found');
  if (req.body.educationalYear) {
    // delete year value from body
    const { educationalYear } = req.body;
    delete req.body.educationalYear;
    let educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
    if (!educationalYearId) {
      educationalYearId = (await educationalYearService.createEducationalYear(educationalYear))?.id;
    }
    req.body.educationalYearId = educationalYearId;
  }
  const result = await monfaqiService.updateMonfaqi(monfaqi, req.body);
  return res.status(httpStatus.ACCEPTED).send(result);
});

module.exports = {
  getMonfaqi,
  getMonfaqies,
  createMonfaqi,
  deleteMonfaqi,
  updateMonfaqi,
};
