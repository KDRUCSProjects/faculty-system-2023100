import { toDateFormat } from '@/utils/date';

export default {
  years(state) {
    return state.years.map((year) => {
      year.createdAt = toDateFormat(year.createdAt);

      return year;
    });
  },
  yearById: (state) => (yearId) => {
    return state.years.find((year) => year.id === yearId);
  },
  selectedYear(state) {
    return state.selectedYear;
  },
  toastMessages(state) {
    return state.toastMessages;
  },
  onGoingYear(state) {
    return {
      year: state.onGoingYear,
      firstHalf: state.firstHalf,
    };
  },
};
