import axios from 'axios';

export default {
  async loadConversionStudents(context, data) {
    try {
      const { type, page, limit, kankorId } = data;
      const token = context.rootGetters.token;

      let url = `/api/${type}?page=${page}&limit=${limit}`;

      if (kankorId?.trim()) url += `&kankorId=${kankorId}`;

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      switch (type) {
        case 'taajils':
          context.commit('setTaajilStudents', response.data.results);
          break;
        case 'tabdili':
          context.commit('setTabdiliStudents', response.data.results);
          break;
        case 'reentries':
          context.commit('setReentriesStudents', response.data.results);
          break;
        case 'monfaqi':
          context.commit('setMonfaqiStudents', response.data.results);
          break;
      }

      // Set count
      context.commit(`${type}CountsSet`, {
        total: response.data.total,
        totalPages: response.data.totalPages,
        page: response.data.page,
      });
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async createConversion(context, { data, type }) {
    try {
      const token = context.rootGetters.token;
      const response = await axios({
        url: `/api/${type}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      // context.commit('saveYear', response.data);
      // context.dispatch('loadConversionStudents', type);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding conversion'], { root: true });
      throw e.response.data.message;
    }
  },
  async deleteConversion(context, { id, type }) {
    try {
      const token = context.rootGetters.token;
      const response = await axios({
        url: `/api/${type}/${id}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // context.commit('saveYear', response.data);
      context.dispatch('loadConversionStudents', type);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed removing conversion'], { root: true });
      throw e.response.data.message;
    }
  },
};
