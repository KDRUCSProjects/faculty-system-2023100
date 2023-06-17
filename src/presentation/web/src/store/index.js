import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import studentsModule from './modules/students';

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
    students: studentsModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
