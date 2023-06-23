export default {
  teachers(state) {
    return state.teachers;
  },
  teacherById: (state) => (teacherId) => {
    return state.teachers.find((teacher) => teacher.id === teacherId);
  },
};
