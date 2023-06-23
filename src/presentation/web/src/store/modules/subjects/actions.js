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
        data
      });

      context.commit('saveSubject', response.data);
    } catch (e) {
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

      console.log(response)

      context.commit('removeSubject', subjectId);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async updateSubject(context, data) {
    try {
      const token = context.rootGetters.token;

      // Remove subject id from data
      delete data.subjectId;

      const response = await axios({
        url: `/api/subjects/${data.subjectId}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data
      });


      context.commit('updateSubject', response.data);
    } catch (e) {
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
};
