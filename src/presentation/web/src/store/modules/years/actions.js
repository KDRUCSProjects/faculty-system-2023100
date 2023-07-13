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
      context.commit('setToast', [0, e.response.data.message || 'Failed load of all Educational year'], { root: true });

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
      context.commit('setToast', 'Educational year successfully deleted', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting of Educational year'], { root: true });
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
      context.commit('setToast', 'Educational year successfully added', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding of Educational year'], { root: true });

      throw e.response.data.message;
    }
  },
  async loadCurrentOnGoingYear(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/years?currentYear=true',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setOnGoingYearAndFirstHalf', response.data);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed loading current educational year'], { root: true });

      throw e.response.data.message;
    }
  },
  async setCurrentOnGoingYear(context, data) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/years/setCurrentYear',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          year: data.year,
          firstHalf: data.firstHalf,
        },
      });

      context.commit('setOnGoingYearAndFirstHalf', response.data);

      // Now, load all educational years
      context.dispatch('loadEducationalYears', response.data);

      // Show what just happened
      context.commit('setToast', `Current on-going educational year has been changed to ${data.year}.`, { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed setting current educational year'], { root: true });

      throw e.response.data.message;
    }
  },
};
