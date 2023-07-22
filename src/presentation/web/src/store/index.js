import { createStore } from 'vuex';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import studentsModule from './modules/students';
import subjectsModule from './modules/subjects';
import departmentModule from './modules/departments';
import semestersModule from './modules/semesters';
import yearsModule from './modules/years';
import conversionModule from './modules/conversion';
import tokensModule from './modules/tokens'

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
    students: studentsModule,
    subjects: subjectsModule,
    departments: departmentModule,
    semesters: semestersModule,
    years: yearsModule,
    conversion: conversionModule,
    tokens: tokensModule,
  },
  state: {
    toastMessages: [],
  },
  getters: {
    toastMessages(state) {
      return state.toastMessages;
    },
  },
  mutations: {
    setToast(state, options) {
      state.toastMessages.push({
        type: options[0] === 0 ? 'error' : 'success',
        text: options[1] && typeof options === 'object' ? options[1] : options,
      });
    },
  },
});
