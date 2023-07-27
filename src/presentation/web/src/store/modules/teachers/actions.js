import axios from 'axios';

export default {
  async loadTeachers(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/users?all=1',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setTeachers', response.data);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All Teacher load failed'], { root: true });
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
      context.commit('setToast', 'Teacher account has been added successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, 'Failed adding Teacher account'], { root: true });
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
      context.commit('setToast', 'Teacher successfully deleted', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting Teacher'], { root: true });
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

      context.commit('updateTeacher', response.data);
      context.commit('setToast', 'Teacher data successfully updated', { root: true });
      // Plus, also update existing teacher data
      // await context.dispatch('loadTeacherById', payload.teacherId);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating Teacher data'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadTeachersAssignedSubjects(context, teacherId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/subjects/teachers/${teacherId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setCurrentTeacherAssignedSubjects', response.data);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
      throw e.response.data.message;
    }
  },
  async loadTeacherById(context, teacherId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/users/${teacherId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setCurrentTeacher', response.data);

      // Plus, also load this teacher assigned subjects
      await context.dispatch('loadTeachersAssignedSubjects', teacherId);

      return response;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
      throw e.response.data.message;
    }
  },
};
