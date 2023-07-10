import axios from 'axios';

export default {
  async loadTaajilStudents(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/taajils`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.results);

      context.commit('setTaajilStudents', response.data.results);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  // async deleteEducationalYearById(context, yearId) {
  //   try {
  //     const token = context.rootGetters.token;

  //     const response = await axios({
  //       url: `/api/years/${yearId}`,
  //       method: 'delete',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     context.commit('removeYear', yearId);
  //   } catch (e) {
  //     throw e.response.data.message;
  //   }
  // },
  async createTaajil(context, data) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/taajils',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      // context.commit('saveYear', response.data);
      context.dispatch('loadTaajilStudents');
    } catch (e) {
      context.commit('setToast', [0, e.message || 'Failed adding taajil'], { root: true });
      throw e.message;
    }
  },
};
