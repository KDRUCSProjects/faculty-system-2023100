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

      if (options.status && options.status != 'reserved') {
        url = url + `&status=${options.status}`;
      }

      const response = await axios({
        url,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      let results = response.data.results;

      // Bad Code! But its Defense Day. ;)
      if (options.status && options.status != 'reserved') {
        if (options.status !== 'all') {
          results = results.map((rec) => rec?.Student);
        }
      }

      context.commit('setStudents', results);
      context.commit('setCounts', {
        total: response.data.total,
        totalPages: response.data.totalPages,
        page: response.data.page,
      });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('All Student load failed') ], { root: true });
      throw e.response.data.message;
    }
  },
  async loadStudentById(context, studentId) {
    try {
      const token = context.rootGetters.token;

      // if (!studentId) return false;

      const response = await axios.get(`/api/students/${studentId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setStudent', response.data);

      return response;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('Student load by failed')], { root: true });
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
      context.commit('setToast', context.rootState.$t('Student successfully deleted'), { root: true });
      return response;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('Failed deleting Student') ], { root: true });
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
      context.commit('setToast', context.rootState.$t('Student data successfully updated'), { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message ||  context.rootState.$t('Failed updating Student data') ], { root: true });
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
          formData.append(key, '');
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
      context.commit('setToast', context.rootState.$t('Student account has been added successfully'), { root: true });
    } catch (e) {
      context.commit('setToast', [0, context.rootState.$t('Failed adding Student account')], { root: true });
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
      context.commit('setToast', [0, context.rootState.$t('Semester students load filed')], { root: true });
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
      context.commit('setToast', [0, e.response.data.message], { root: true });
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
      context.commit('setToast', context.rootState.$t('Student added successfully to Semester'), { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
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
      context.commit('setToast', context.rootState.$t('Student successfully remove from Semester'), { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
      throw e.response.data.message;
    }
  },
  async downloadTranscript(context, studentId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/transcript/${studentId}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
