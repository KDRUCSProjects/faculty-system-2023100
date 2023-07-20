import axios from 'axios';

export default {
  async loadSemestersByYear(context, payload = 1401) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/semesters?year=${payload}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setCurrentYearSemesters', response.data);
      context.commit('setCurrentYear', payload);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All semesters load failed'], { root: true });
      throw e.response.data.message;
    }
  },

  async loadSemesterById(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/semesters/${semesterId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setSemester', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
