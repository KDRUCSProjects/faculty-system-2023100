const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { shokaListService, shokaService, subjectService, semesterService, studentService, studentListService } = require('../services');
const ApiError = require('../utils/ApiError');
const { http } = require('winston');

const createShokaList = catchAsync(async (req, res) => {
    const { shokaFK, studentFK } = req.body;
    const isStudentListedInShokaList = await shokaListService.isStudentListedInShokaList(shokaFK, studentFK);
    if (isStudentListedInShokaList) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has gotten marks in this shoka');
    const student = await studentService.getStudent(studentFK);
    if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Fount');
    const shoka = await shokaService.findShokaById(shokaFK);
    if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'Shoka Not Found');
    const subject = await subjectService.getSubject(shoka.subjectId);
    if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
    const semester = await semesterService.findSemesterById(subject.semesterId);
    const isStudentListed = await studentListService.findListedStudentByStudentId(studentFK)
    if (semester.id === isStudentListed?.semesterId) {
        const shokaList = await shokaListService.createShokaList(req.body);
        return res.status(httpStatus.CREATED).send(shokaList);
    } else {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not exists in this semester');
    }

});

const getShokaList = catchAsync(async (req, res) => {
    const results = await shokaListService.getShokaList(req.params.shokaId);
    res.status(httpStatus.OK).send(results);
});

module.exports = {
    getShokaList,
    createShokaList,
};
