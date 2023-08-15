import axios from 'axios';

export default {
  async loadSubjects(context) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/subjects',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setSubjects', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async addSubject(context, data) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/subjects',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      });

      context.commit('saveSubject', response.data);
      context.commit('setToast', 'Subject has been added successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding Subject'], { root: true });
      throw e.response.data.message;
    }
  },
  async deleteSubject(context, subjectId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/subjects/${subjectId}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('removeSubject', subjectId);
      context.commit('setToast', 'Subject successfully deleted', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting Subject'], { root: true });
      throw e.response.data.message;
    }
  },
  async updateSubject(context, payload) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/subjects/${payload.subjectId}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: payload.name,
          credit: payload.credit,
        },
      });

      context.commit('updateSubject', response.data);
      context.commit('setToast', 'Subject data successfully updated', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating Subject data'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadSubjectById(context, subjectId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/subjects/${subjectId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // context.commit();

      return response;
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async loadShokaBySubjectId(context, { subjectId, chance }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/shokaList/${subjectId}?chance=${chance}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setShoka', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async updateShokaByShokaListId(context, { shokaListId, chance, marks }) {
    try {
      const token = context.rootGetters.token;

      console.log(marks);

      const response = await axios({
        url: `/api/shokaList/${shokaListId}?chance=${chance}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: marks,
      });

      context.commit('setToast', 'Marks successfully updated', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating student marks'], { root: true });
      throw e.response.data.message;
    }
  },
  async addStudentMarksToShokaBySubjectId(context, { subjectId, chance, marks, studentId }) {
    try {
      const token = context.rootGetters.token;

      // If you want to add 2nd or 3rd chance, then add the query otherwise empty
      let url = `/api/shokaList`;

      if (chance !== 1) url = url + `?chance=${chance}`;
      const response = await axios({
        url,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { ...marks, subjectId, studentId },
      });

      context.commit('setToast', 'Marks has been added successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding student marks to shoka'], { root: true });
      throw e.response.data.message;
    }
  },
  async downloadSubjectShokaBySubjectId(context, { subjectId, chance }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/shokaList/shokas/${subjectId}?chance=${chance}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // context.commit();

      return response;
    } catch (e) {
      throw e.response.data.message;
    }
  },
};
