import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      tabdiliStudents: [],
      taajilStudents: [],
      reentriesStudents: [],
      monfaqiStudents: [],
      taajilsCount: 0,
      monfaqiCount: 0,
      tabdiliCount: 0,
      reentriesCount: 0,
    };
  },
  getters,
  mutations,
  actions,
};
