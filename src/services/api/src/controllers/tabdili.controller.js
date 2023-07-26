const httpStatus = require('http-status');
const i18n = require('i18n');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tabdiliService, studentService, educationalYearService } = require('../services');

const createTabdili = catchAsync(async (req, res) => {
    const { studentId, educationalYear } = req.body;
    const student = await studentService.getStudent(studentId);
    if (!student) throw new ApiError(httpStatus.NOT_FOUND,  i18n.__('studentNotFound'));
    const studentTabili = await tabdiliService.findTabdiliByStudentId(studentId);
    if (studentTabili) throw new ApiError(httpStatus.NOT_ACCEPTABLE,  i18n.__('studentAlreadyHasTabdili'));
    // delete year value from body
    delete req.body.educationalYear;
    let educationalYearId = await educationalYearService.findEducationalYearByValue(educationalYear);
    if (!educationalYearId) {
        educationalYearId = (await educationalYearService.createEducationalYear(educationalYear))?.id;
    }
    req.body.educationalYearId = educationalYearId;
    const tabdili = await tabdiliService.createTabdili(req.body);
    return res.status(httpStatus.CREATED).send(tabdili);
});



const getTabdilis = catchAsync(async (req, res) => {
    const tabdilis = await tabdiliService.getTabdilis();
    return res.status(httpStatus.OK).send(tabdilis);
});


const getTabdili = catchAsync(async (req, res) => {
    const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
    if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND,  i18n.__('tabdiliNotFound'));
    return res.status(httpStatus.OK).send(tabdili);
});

const deleteTabdili = catchAsync(async (req, res) => {
    const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
    if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND, i18n.__('tabdiliNotFound'));
    await tabdiliService.deleteTabdili(tabdili);
    return res.status(httpStatus.NO_CONTENT).send();
});

const updateTabdili = catchAsync(async (req, res) => {
    const tabdili = await tabdiliService.findTabdiliById(req.params.tabdiliId);
    if (!tabdili) throw new ApiError(httpStatus.NOT_FOUND,  i18n.__('tabdiliNotFound'));
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
