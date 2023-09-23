const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tabdiliService, studentService, educationalYearService, studentListService } = require('../services');

const createTabdili = catchAsync(async (req, res) => {
  const { studentId, educationalYear } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const studentTabili = await tabdiliService.findTabdiliByStudentId(studentId);
  if (studentTabili) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student already has tabdili');

  let educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
  if (!educationalYearId) {
    await educationalYearService.createEducationalYear(educationalYear);
  }
  // Get student on-going semester id
  const currentSemesterId = await studentListService.findStudentLatestSemesterId(studentId);
  req.body.semesterId = currentSemesterId;
  req.body.year = educationalYear;

  const tabdili = await tabdiliService.createTabdili(req.body);

  return res.status(httpStatus.CREATED).send(tabdili);
});

const getTabdilis = catchAsync(async (req, res) => {
  if (req.query.studentId) {
    const { studentId } = req.query;
    const results = await tabdiliService.findTabdiliByStudentId(studentId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `Tabdili Not Found With Student id ${studentId}`);
    return res.status(httpStatus.OK).send(results);
  }
  if (req.query.tabdiliId) {
    const { tabdiliId } = req.query;
    const results = await tabdiliService.findTabdiliById(tabdiliId);
    if (!results) throw new ApiError(httpStatus.NOT_FOUND, `tabdili Not Found with id ${tabdiliId}`);
    return res.status(httpStatus.OK).send(results);
  }
  // if (req.query.kankorId) {
  //   const { kankorId } = req.query;
  //   const results = await tabdiliService.findTabdiliByStdKankorId(kankorId);
  //   if (!results) throw new ApiError(httpStatus.NOT_FOUND, `tabdili Not Found Student With Kankor id ${kankorId}`);
  //   return res.status(httpStatus.OK).send(results);
  // }
  // calculate query parameters
  const page = req.query?.page ? req.query?.page : 1;
  const limit = req.query?.limit ? req.query?.limit : 2000;
  const offset = parseInt((page - 1) * limit, 10);

  if (req.query.educationalYear) {
    const { educationalYear } = req.query;
    const educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
    if (!educationalYearId) throw new ApiError(httpStatus.NOT_FOUND, 'educationalYear not found');
    const { count, rows } = await tabdiliService.findTabdiliByYearId(limit, offset, educationalYear);
    return res.status(httpStatus.OK).send({
      page: parseInt(page, 10),
      totalPages: Math.ceil(count / limit),
      total: count,
      results: rows,
    });
  }

  const { count, rows } = await tabdiliService.getTabdilis(limit, offset, req.query.kankorId);
  return res.status(httpStatus.OK).send({
    page: parseInt(page, 10),
    totalPages: Math.ceil(count / limit),
    total: count,
    results: rows,
  });
});

const getTabdili = catchAsync(async (req, res) => {
  const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
  if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND, 'tabdili not found');
  return res.status(httpStatus.OK).send(tabdili);
});

const deleteTabdili = catchAsync(async (req, res) => {
  const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
  if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND, 'tabdili not found');
  await tabdiliService.deleteTabdili(tabdili);
  return res.status(httpStatus.NO_CONTENT).send();
});

const updateTabdili = catchAsync(async (req, res) => {
  const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
  if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND, 'tabdili not found');
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
  const result = await tabdiliService.updateTabdili(tabdili, req.body);
  return res.status(httpStatus.ACCEPTED).send(result);
});

module.exports = {
  getTabdili,
  getTabdilis,
  createTabdili,
  deleteTabdili,
  updateTabdili,
};
