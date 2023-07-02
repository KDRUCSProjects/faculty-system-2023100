import { createStore } from 'vuex';
import axios from 'axios';

// Import vuex modules
import authModule from './modules/auth';
import teachersModule from './modules/teachers';
import studentsModule from './modules/students';
import subjectsModule from './modules/subjects';
import departmentModule from './modules/departments'
import semestersModule from './modules/semesters';

export default createStore({
  modules: {
    auth: authModule,
    teachers: teachersModule,
    students: studentsModule,
    subjects: subjectsModule,
    departments: departmentModule
    semesters: semestersModule,
  },
  state: {
    years: [],
    selectedYear: null,
  },
  getters: {
    years(state) {
      return state.years.map((year) => {
        return year.year;
      });
    },
    selectedYear(state) {
      return state.selectedYear;
    },
  },
  mutations: {
    setYears(state, years) {
      state.years = years;
    },
    setSelectedYear(state, year) {
      state.selectedYear = year;
    },
  },
  actions: {
    async loadAllYears(context) {
      try {
        const token = context.rootGetters.token;

        const response = await axios({
          url: `/api/years`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        context.commit('setYears', response.data);
      } catch (e) {
        throw e.response.data.message;
      }
    },
  },
});
