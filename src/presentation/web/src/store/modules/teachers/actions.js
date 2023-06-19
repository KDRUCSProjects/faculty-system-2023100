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

      const formData = new FormData();

      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      const response = await axios.post('/api/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

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
  async updateTeacher(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      for (let key in payload) {
        // Skip teacherId
        if (key === 'teacherId') continue;

        formData.append(key, payload[key]);
      }

      const response = await axios.patch(`/api/users/${payload.teacherId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      context.commit('updateTeacher', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
