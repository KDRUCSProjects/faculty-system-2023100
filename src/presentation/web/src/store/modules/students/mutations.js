export default {
  setStudents(state, payload) {
    state.students = payload;
  },
  setCounts(state, options) {
    state.counts = options;
  },
  saveStudent(state, newlyAddedStudent) {
    state.students.unshift(newlyAddedStudent);
  },
};
