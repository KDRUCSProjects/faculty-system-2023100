export default {
  setYears(state, payload) {
    state.years = payload;
  },
  saveYear(state, newYear) {
    state.years.unshift(newYear);
  },
  removeYear(state, yearId) {
    state.years = state.years.filter((year) => year.id !== yearId);
  },
  setSelectedYear(state, year) {
    state.selectedYear = year;
  },
  setOnGoingYearAndFirstHalf(state, data) {
    state.onGoingYear = data.year;
    state.firstHalf = data.firstHalf;

    state.onGoingYearData = data;
  },
};
