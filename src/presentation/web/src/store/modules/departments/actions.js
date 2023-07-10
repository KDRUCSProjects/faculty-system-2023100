import axios from 'axios';

export default {

  async getDepartments(context) {
    try {
      const token = context.rootGetters.token
      console.log(token)
      const response = await axios.get('/api/departments', {
        headers: {Authorization: `Bearer ${token}`}
      })
      
      context.commit('setDepartment', response.data);

    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'All Department load failed'], { root: true });
      throw e.response.data.message;
    }
  },
  async deleteDepartment(context, departmentId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: `/api/departments/${departmentId}`,
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      context.commit('removeDepartment', departmentId);
      context.commit('setToast', 'Department successfully deleted', { root: true });

    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed deleting Department'], { root: true });
      throw e.response.data.message;
    }
  },

  async addDepartment(context, data) {
    console.log(data)
    try {
      const token = context.rootGetters.token;

      const response = await axios({
        url: '/api/departments',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data
      });

      context.commit('saveDepartment', response.data);
      context.commit('setToast', 'Department successfully added', { root: true });

    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed adding Department'], { root: true });
      throw e.response.data.message;
    }
  },

  async loadDepartmentById(context, departmentId) {
    try {
      const token = context.rootGetters.token;

      const response = await axios.get(`/api/departments/${departmentId}`, {
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
  async updateDepartment(context, payload) {
    try {
      const token = context.rootGetters.token;
      const data = {
        name: payload.name
      }
  

      const response = await axios({
        url: `/api/departments/${payload.departmentId}`,
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: payload.name,
        },
      });
  

      context.commit('editDepartment', response.data);
      context.commit('setToast', 'Department successfully updated', { root: true });

    } catch (e) {
      context.commit('setToast', [0, e.response.data.message || 'Failed updating Department'], { root: true });
      throw e.response.data.message;
    }
  }

};
