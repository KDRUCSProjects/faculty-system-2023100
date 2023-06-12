export default {
  setTeachers(state, payload) {
    state.teachers = payload;
  },
  saveTeacher(state, newlyAddedTeacher) {
    state.teachers.unshift(newlyAddedTeacher);
  },
  removeTeacher() {},
};
