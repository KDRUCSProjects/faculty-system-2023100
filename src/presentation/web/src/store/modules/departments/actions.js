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
      throw e.response.data.message;
    }
  },
  async deleteDepartment(context, departmentId) {
    console.log(departmentId)
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
    } catch (e) {
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
    } catch (e) {
      console.log(e)
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
    console.log(payload)
    try {
      const token = context.rootGetters.token;

      // const formData = new FormData();

      // for (let key in payload) {
      //   // Skip departmentId
      //   if (key === 'departmentId') continue;

      //   // formData.append(key, payload[key]);
      //   formData.set(key, payload[key])
      //   console.log(formData)
      // }

      const data = {
        name: payload.name
      }


      const response = await axios.patch(`/departments/${payload.departmentId}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data
      });

      context.commit('editDepartment', response.data);
    } catch (e) {
      throw e.response.data.message;
    }
  },

};
