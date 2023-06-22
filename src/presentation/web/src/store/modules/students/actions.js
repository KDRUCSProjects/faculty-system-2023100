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
  async loadStudentById(context, studentId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/students/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setStudent', response.data);

      return response;
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async updateStudent(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      console.log(payload);

      for (let key in payload) {
        // Skip teacherId
        if (key === 'studentId') continue;

        console.log(key, payload[key]);
        formData.append(key, payload[key]);
      }

      const response = await axios.patch(`/api/students/${payload.studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      context.commit('updateStudent', {
        fields: payload,
        update: response.data,
      });

      context.commit('setStudent', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
