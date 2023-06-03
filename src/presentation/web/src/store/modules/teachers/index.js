import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      userId: null,
      token: null,
      email: null,
      userData: null,
      didAutoLogout: false,
    };
  },
  getters,
  mutations,
  actions,
};
