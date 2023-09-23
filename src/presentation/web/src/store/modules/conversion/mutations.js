export default {
  setTaajilStudents(state, students) {
    state.taajilStudents = students;
  },
  setTabdiliStudents(state, students) {
    state.tabdiliStudents = students;
  },
  setReentriesStudents(state, students) {
    state.reentriesStudents = students;
  },
  setMonfaqiStudents(state, students) {
    state.monfaqiStudents = students;
  },
  taajilsCountsSet(state, count) {
    state.taajilsCount = count;
  },
  monfaqiCountsSet(state, count) {
    state.monfaqiCount = count;
  },
  tabdiliCountsSet(state, count) {
    state.tabdiliCount = count;
  },
  reentriesCountsSet(state, count) {
    state.reentriesCount = count;
  },
};
