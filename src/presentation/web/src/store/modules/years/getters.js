export default {
    years(state) {
      return state.years;
    },
    yearById: (state) => (yearId) => {
      return state.years.find((year) => year.id === yearId);
    },
  };
  