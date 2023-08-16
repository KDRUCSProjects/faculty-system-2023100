import axios from 'axios';

export default {
  async loadSemestersByYear(context, payload = 1401) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/semesters?year=${payload}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setCurrentYearSemesters', response.data);
      context.commit('setCurrentYear', payload);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All semesters load failed'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadSemesterById(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/semesters/${semesterId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setSemester', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async reviewSemesterStudentsPromotion(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/studentList/promote/${semesterId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setReviewStudents', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },
  async promoteStudentsBySemester(context, semesterId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/studentList/promote/${semesterId}`,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setToast', [1, 'Migration has been completed successfully'], { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
      throw e.response.data.message;
    }
  },
  async loadSemestersByPeriod(context, payload = 7) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/years?period=${payload}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setCurrentPeriodSemesters', response.data?.unorderedSemesters);
      context.commit('setCurrentPeriod', payload);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All semesters load failed'], { root: true });
      throw e.response.data.message;
    }
  },
  async loadStatistics(context, year) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/semesters?statistics=true&year=${year}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('setStatistics', response.data);
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All semesters load failed'], { root: true });
      throw e.response.data.message;
    }
  },
  async downloadSemesterReportByType(context, { semesterId, type }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/report/conversion?semesterId=${semesterId}&type=${type}`, {
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
  async downloadBadlAsha(context, { year, classTitle }) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/badliAsha?year=${year}&classTitle=${classTitle}`, {
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
