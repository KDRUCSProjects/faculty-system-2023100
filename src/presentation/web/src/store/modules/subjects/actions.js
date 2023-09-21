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
  async downloadSubjectAttendanceBySubjectId(context, { subjectId, start, end }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/subjects/${subjectId}/report?startDate=${start}&endDate=${end}`, {
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
  async loadAttendanceBySubjectId(context, { subjectId, month }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/attendance/report/${subjectId}?month=${month}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setAttendance', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async addStudentCountToAttendanceBySubjectId(context, { subjectId, month, counts, studentId }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/attendance/report/${subjectId}?month=${month}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { ...counts, subjectId, studentId, month },
      });

      context.commit('setAttendance', response.data);
      context.commit('setToast', 'Attendance has been added successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding student attendance report'], { root: true });
      throw e.response.data.message;
    }
  },
  async updateAttendanceByReportId(context, { subjectId, month, counts, studentId, id }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/attendance/report/${subjectId}?month=${month}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { ...counts, subjectId, studentId, month, id },
      });

      context.commit('setAttendance', response.data);

      context.commit('setToast', 'Attendance has been updated successfully', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating student attendance report'], {
        root: true,
      });
      throw e.response.data.message;
    }
  },
  async uploadAttachment(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      for (let key in payload) {
        formData.append(key, payload[key]);
      }

      const result = await axios.post(`/api/attachments`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Instead of adding the student, let's reload. This will be changed later as this is not good for performance.
      // context.commit('setToast', 'Attachment has been added successfully', { root: true });

      return result;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed uploadting attachment'], { root: true });
      throw e.response.data.message;
    }
  },
  async updateAttachment(context, payload) {
    try {
      const token = context.rootGetters.token;

      const formData = new FormData();

      formData.append('photo', payload.photo);

      const result = await axios.patch(`/api/attachments/${payload.attachmentId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      // Instead of adding the student, let's reload. This will be changed later as this is not good for performance.
      // context.commit('setToast', 'Attachment has been updated successfully', { root: true });

      return result;
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating attachment'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadAttachment(context, data) {
    try {
      const token = context.rootGetters.token;
      let url = `/api/attachments/${data.attachableId}?type=${data.type}`;

      if (data.attribute != null || data.attribute != undefined) url = url + `&attribute=${data.attribute}`;

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);

      return response;
    } catch (e) {
      return null;
    }
  },
  async deleteAttachment(context, attachableId) {
    try {
      const token = context.rootGetters.token;

      await axios({
        url: `/api/attachments/${attachableId}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // context.commit('setToast', 'Attachment successfully deleted', { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting attachment'], { root: true });
      throw e.response.data.message;
    }
  },
};
