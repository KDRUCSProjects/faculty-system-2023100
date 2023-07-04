import axios from 'axios';

export default {
  async loadStudents(context, options = { page: 1 }) {
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
  async deleteStudentById(context, studentId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.delete(`/api/students/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Instead of committing, let's reload all students
      context.dispatch('loadStudents');

      return response;
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async updateStudent(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      for (let key in payload) {
        // Skip teacherId
        if (key === 'studentId') continue;

        formData.append(key, payload[key]);
      }

      const response = await axios.patch(`/api/students/${payload.studentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('updateStudent', {
        fields: payload,
        update: response.data,
      });

      context.commit('setStudent', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async addStudent(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      for (let key in payload) {
        const value = payload[key];
        if (value) {
          formData.append(key, payload[key]);
        } else {
          formData.append(key, null);
        }
      }

      await axios.post(`/api/students`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Instead of adding the student, let's reload. This will be changed later as this is not good for performance.
      context.dispatch('loadStudents');
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async loadStudentsListBySemesterId(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/studentList?semesterId=${semesterId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      context.commit('setStudentsList', response.data.results);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async loadStudentByKankorId(context, kankorId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/students/kankor/${kankorId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setSearchedStudent', response.data);

      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
