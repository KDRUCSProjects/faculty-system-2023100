import axios from 'axios';

export default {
  async loadStudents(context, options) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/students?page=${options.page}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      context.commit('setStudents', response.data.results);
      context.commit('setCounts', {
        total: response.data.total,
        totalPages: response.data.totalPages,
        page: response.data.page,
      });
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
