import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import studentsModule from './modules/students';
import subjectsModule from './modules/subjects';

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
    students: studentsModule,
    subjects: subjectsModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
