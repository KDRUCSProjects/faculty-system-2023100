import axios from 'axios';

export default {
  async loadStudents(context, options = { page: 1, itemsPerPage: 8 }) {
    try {
      const token = context.rootGetters.token;

      let url = `/api/students?page=${options.page}`;
      if (options.limit) {
        url = url + `&limit=${options.limit}`;
      }

      if (options.like) {
        url = url + `&kankorId=${options.like}`;
      }

      const response = await axios({
        url,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setStudents', response.data.results);
      context.commit('setCounts', {
        total: response.data.total,
        totalPages: response.data.totalPages,
        page: response.data.page,
      });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All Teacher load failed'], { root: true });
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
      context.commit('setToast', 'Student successfully deleted', { root: true });
      return response;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting Student'], { root: true });
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
      context.commit('setToast', 'Student data successfully updated', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating Student data'], { root: true });
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
      context.commit('setToast', 'Student account has been added successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, 'Failed adding Student account'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadStudentsListBySemesterId(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        // The limit will be soon removed
        url: `/api/studentList?semesterId=${semesterId}&limit=2000`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setStudentsList', response.data.results);

      // Plus, also load current semester data
      context.dispatch('semesters/loadSemesterById', semesterId, { root: true });
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async loadStudentByKankorId(context, { search }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/students/kankor/${search}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setSearchedStudent', response.data);

      context.commit('setStudents', [response.data]);

      return response.data;
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async addStudentToSemester(context, { semesterId, studentId }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/studentList`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          studentId: parseInt(studentId),
          semesterId: parseInt(semesterId),
        },
      });

      // Let's reload the students
      context.dispatch('loadStudentsListBySemesterId', semesterId);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async deleteStudentFromSemester(context, { semesterId, studentId }) {
    try {
      const token = context.rootGetters.token;

      const data = [
        {
          studentId: parseInt(studentId),
          semesterId: parseInt(semesterId),
        },
      ];

      const response = await axios({
        url: `/api/studentList`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      // Let's reload the students
      context.dispatch('loadStudentsListBySemesterId', semesterId);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async promoteStudents(context, students) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/studentList/promote`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: students,
      });

      // Let's reload all semester data
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
