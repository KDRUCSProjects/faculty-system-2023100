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
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('All semesters load failed')], { root: true });
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

      return response;
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

      context.commit('setToast', [1, context.rootState.$t('Migration has been completed successfully')], { root: true });
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
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('All semesters load failed')], { root: true });
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
      context.commit('setToast', [0, e.response.data.message || context.rootState.$t('All semesters load failed')], { root: true });
      throw e.response.data.message;
    }
  },
  async downloadSemesterReportByType(context, { semesterId, type, gender }) {
    try {
      const token = context.rootGetters.token;

      let url = `/api/report/conversion?semesterId=${semesterId}&type=${type}`;

      if (gender != 'all') {
        url = url + `&gender=${gender}`;
      }
      const response = await axios.get(url, {
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
  async downloadPeriodResultTable(context, period) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/resultSheet/${period}`, {
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

  async updateDuration(context, data) {
    try {
      const token = context.rootGetters.token;

      const semesterId = data.semesterId;

      delete data.semesterId;

      console.log(data);
      console.log(semesterId);

      const response = await axios({
        url: `/api/semesters/${semesterId}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });

      context.commit('setToast', [1, context.rootState.$t('Migration has been completed successfully')], { root: true });
    } catch (e) {
      context.commit('setToast', [0, e.response.data.message], { root: true });
      throw e.response.data.message;
    }
  },
};
