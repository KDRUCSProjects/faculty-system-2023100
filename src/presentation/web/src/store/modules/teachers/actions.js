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
  async addTeacher(context, payload) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/users',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      });

      console.log(response);

      context.commit('saveTeacher', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async deleteTeacher(context, teacherId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/users/${teacherId}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('removeTeacher', teacherId);
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
