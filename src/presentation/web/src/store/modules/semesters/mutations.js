export default {
  setCurrentYearSemesters(state, payload) {
    state.currentYearSemesters = payload;
  },
  setCurrentPeriodSemesters(state, payload) {
    state.currentPeriodSemesters = payload;
  },
  setCurrentYear(state, payload) {
    state.currentYear = payload;
  },
  setSemester(state, payload) {
    state.semester = payload;
  },
  setReviewStudents(state, payload) {
    state.reviewStudents = payload;
  },
  setSelectedPeriodByUser(state, payload) {
    state.selectedPeriodByUser = payload;
  },
  setSelectedYearByUser(state, payload) {
    state.selectedYearByUser = payload;
  },
  setStatistics(state, payload) {
    state.statistics = payload;
  },
};
