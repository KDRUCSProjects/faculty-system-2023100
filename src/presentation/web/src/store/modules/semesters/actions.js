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
      throw e.response.data.message;
    }
  },
};
