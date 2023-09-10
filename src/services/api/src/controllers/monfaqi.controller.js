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
  // delete year value from body

  let educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
  if (!educationalYearId) {
    educationalYearId = (await educationalYearService.createEducationalYear(educationalYear))?.id;
  }

  req.body.year = educationalYearId;

  // Get student on-going semester id
  const currentSemesterId = await studentListService.findStudentLatestSemesterId(studentId);
  req.body.semesterId = currentSemesterId;

  const monfaqi = await monfaqiService.createMonfaqi(req.body);
  return res.status(httpStatus.CREATED).send(monfaqi);
});

const getMonfaqies = catchAsync(async (req, res) => {
  const monfaqies = await monfaqiService.getMonfaqis();
  return res.status(httpStatus.OK).send(monfaqies);
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
