import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import studentsModule from './modules/students';
import subjectsModule from './modules/subjects';
import semestersModule from './modules/semesters';

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
    students: studentsModule,
    subjects: subjectsModule,
    semesters: semestersModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
