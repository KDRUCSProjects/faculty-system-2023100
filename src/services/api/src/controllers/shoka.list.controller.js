const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const {
  shokaListService,
  shokaService,
  subjectService,
  semesterService,
  studentService,
  studentListService,
} = require('../services');
const ApiError = require('../utils/ApiError');

const createShokaList = catchAsync(async (req, res) => {
  const { shokaId, studentId } = req.body;
  const isStudentListedInShokaList = await shokaListService.isStudentListedInShokaList(shokaId, studentId);
  if (isStudentListedInShokaList) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has gotten marks in this shoka');
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Fount');
  const shoka = await shokaService.findShokaById(shokaId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'Shoka Not Found');
  const subject = await subjectService.getSubject(shoka.subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const semester = await semesterService.findSemesterById(subject.semesterId);
  const isStudentListed = await studentListService.findListedStudentByStudentId(studentId);
  if (isStudentListed && (semester.id === isStudentListed?.semesterId)) {
    const shokaList = await shokaListService.createShokaList(req.body);
    return res.status(httpStatus.CREATED).send(shokaList);
  }
  throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not exists in this semester');
});

const getShokaList = catchAsync(async (req, res) => {
  const results = await shokaListService.getShokaList(req.params.shokaId);
  res.status(httpStatus.OK).send(results);
});

const getStudentMarks = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  // create conditions for query
  const conditions = [`shokalist.deletedAt IS NULL`, `shokalist.studentId = ${studentId}`];

  if (req.query?.semester) {
    const { semester } = req.query;
    conditions.push(`semester.title = ${semester}`);
    const results = await shokaListService.getStudentMarks(conditions);
    return res.status(httpStatus.OK).send(results);
  }

  if (req.query?.class) {
    const classTitle = req.query.class;
    switch (classTitle) {
      case 1:
        conditions.push(`(semester.title = 1 OR semester.title = 2)`)
        break;
      case 2:
        conditions.push(`(semester.title = 3 OR semester.title = 4)`);
        break;
      case 3:
        conditions.push(`(semester.title = 5 OR semester.title = 6)`)
        break;
      case 4:
        conditions.push(`(semester.title = 7 OR semester.title = 8)`)
        break;
      default:
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Query Parameters');
    }
    const results = await shokaListService.getStudentMarks(conditions);
    return res.status(httpStatus.OK).send(results);
  }

  const results = await shokaListService.getStudentMarks(conditions);
  return res.status(httpStatus.OK).send(results);

});

module.exports = {
  getShokaList,
  createShokaList,
  getStudentMarks,
};
