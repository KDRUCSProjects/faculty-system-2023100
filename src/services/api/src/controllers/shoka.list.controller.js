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
const { marksFormatter } = require('../utils/marks.formatter');

const createShokaList = catchAsync(async (req, res) => {
  const { studentId, subjectId } = req.body;
  const student = await studentService.getStudent(studentId);
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'student not found');
  const subject = await subjectService.getSubjectById(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  const doesStdHasMarks = await shokaListService.isStudentListedInShokaList(shoka.id, studentId);
  if (doesStdHasMarks) throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'student has marks in this subject and shoka');

  const semester = await semesterService.findSemesterById(subject.semesterId);
  const isStudentListed = await studentListService.findListedStudentByStudentId(studentId);
  if (isStudentListed.length >= 1 && (semester.id === isStudentListed[0]?.semesterId)) {
    req.body.shokaId = shoka.id;
    const shokaList = await shokaListService.createShokaList(req.body);
    return res.status(httpStatus.CREATED).send(shokaList);
  }
  throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student does not exists in this semester');
});

const getShokaList = catchAsync(async (req, res) => {
  const { subjectId } = req.params;
  const subject = await subjectService.getSubject(subjectId);
  if (!subject) throw new ApiError(httpStatus.NOT_FOUND, 'subject not found');
  const shoka = await shokaService.findShokaBySubjectId(subjectId);
  if (!shoka) throw new ApiError(httpStatus.NOT_FOUND, 'shoka not found');
  const results = await shokaListService.getShokaMarks(shoka.id);
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
    const formatMarks = marksFormatter(results);
    return res.status(httpStatus.OK).send(formatMarks);
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
    const formatMarks = marksFormatter(results);
    return res.status(httpStatus.OK).send(formatMarks);
  }

  const results = await shokaListService.getStudentMarks(conditions);
  const formatMarks = marksFormatter(results);
  return res.status(httpStatus.OK).send(formatMarks);

});

module.exports = {
  getShokaList,
  createShokaList,
  getStudentMarks,
};
