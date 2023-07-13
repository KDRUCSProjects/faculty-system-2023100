import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      years: [],
      selectedYear: null,
      onGoingYear: null,
      firstHalf: false,
    };
  },
  getters,
  mutations,
  actions,
};
