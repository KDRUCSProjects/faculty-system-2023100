import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
