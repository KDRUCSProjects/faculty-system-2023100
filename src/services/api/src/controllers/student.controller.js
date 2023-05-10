const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { studentService } = require('../services');

const registerStudent = catchAsync(async (req, res) => {
    const results = await studentService.registerStudent(req.body);
    res.status(httpStatus.CREATED).send({ results });
});

const updateStudent = catchAsync(async (req, res) => {

});


module.exports = {
    updateStudent,
    registerStudent,
};
