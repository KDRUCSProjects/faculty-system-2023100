import axios from 'axios';

export default {
  async loadTeachers(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/users',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setTeachers', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async deleteTeacher(context) {
    context.commit('removeTeacher');
  },
};
