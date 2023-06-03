import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';

export default createStore({
  modules: {
    auth: authModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
