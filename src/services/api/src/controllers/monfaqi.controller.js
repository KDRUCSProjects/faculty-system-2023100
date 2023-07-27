const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { monfaqiService, studentService, educationalYearService } = require('../services');

const createMonfaqi = catchAsync(async (req, res) => {
  const { studentId, year } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const studentMonfaqi = await monfaqiService.findMonfaqiByStudentId(studentId);
  if (studentMonfaqi) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student already has monfaqi');
  // delete year value from body
  delete req.body.year;
  let educationalYearId = await educationalYearService.findEducationalYearByValue(year);
  if (!educationalYearId) {
    educationalYearId = (await educationalYearService.createEducationalYear(year))?.id;
  }

  req.body.year = educationalYearId;
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
