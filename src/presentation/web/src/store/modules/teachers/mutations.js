export default {
  setTeachers(state, payload) {
    state.teachers = payload;
  },
  saveTeacher(state, newlyAddedTeacher) {
    state.teachers.unshift(newlyAddedTeacher);
  },
  removeTeacher(state, teacherId) {
    state.teachers = state.teachers.filter((teacher) => teacher.id !== teacherId);
  },
};
