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
      context.commit('setToast',  context.rootState.$t('Token successfully generated') , { root: true });

    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('Token load failed') ], { root: true });
      throw e.response.data.message;
    }
  },

};
