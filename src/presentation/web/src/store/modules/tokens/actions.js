import axios from 'axios';

export default {
  async loadTokens(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/auth/token',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setTokens', response.data);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Token load failed'], { root: true });
      throw e.response.data.message;
    }
  },

};
