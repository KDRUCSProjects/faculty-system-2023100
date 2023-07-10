import axios from 'axios';

export default {
  async loadEducationalYears(context) {
    try {
      const token = context.rootGetters.token;
      const response = await axios.get('/api/years', {
        headers: { Authorization: `Bearer ${token}` },
      });

      context.commit('setYears', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async deleteEducationalYearById(context, yearId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/years/${yearId}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('removeYear', yearId);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async addEducationalYear(context, data) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/years',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      context.commit('saveYear', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
