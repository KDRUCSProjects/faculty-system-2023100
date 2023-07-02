import axios from 'axios';

export default {

  async getDepartments(context) {
    try {
      const token = context.rootGetters.token;

      console.log(token)
      // const response = await axios({
      //   url: '/departments',
      //   method: 'get',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      axios.get('http://localhost:4000/departments', {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then((response)=>{
        context.commit('setDepartment', response.data);
      })
     
    } catch (e) {
      throw e.response.data.message;
    }
  },
   // axios.get('http://localhost:4000/departments', {
      //   headers: {Authorization: `Bearer ${token}`}
      // })
      // .then((response)=>{
      //   context.commit('setDepartment', response.data);
      // })
      // .catch(error=>{
          
      // })

//   async addDepartment(context, payload) {
//     try {
//       const token = context.rootGetters.token;

//       const formData = new FormData();

//       for (let key in payload) {
//         formData.append(key, payload[key]);
//       }

//       const response = await axios.post('/api/users', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       context.commit('saveTeacher', response.data);
//     } catch (e) {
//       throw e.response.data.message;
//     }
//   },
//   async deleteTeacher(context, teacherId) {
//     try {
//       const token = context.rootGetters.token;

//       const response = await axios({
//         url: `/api/users/${teacherId}`,
//         method: 'delete',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       context.commit('removeTeacher', teacherId);
//     } catch (e) {
//       throw e.response.data.message;
//     }
//   },
//   async updateTeacher(context, payload) {
//     try {
//       const token = context.rootGetters.token;

//       const formData = new FormData();

//       for (let key in payload) {
//         // Skip teacherId
//         if (key === 'teacherId') continue;

//         formData.append(key, payload[key]);
//       }

//       const response = await axios.patch(`/api/users/${payload.teacherId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       context.commit('updateTeacher', response.data);
//     } catch (e) {
//       throw e.response.data.message;
//     }
//   },
//   async loadTeacherById(context, teacherId) {
//     try {
//       const token = context.rootGetters.token;

//       const response = await axios.get(`/api/users/${teacherId}`, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // context.commit();

//       return response;
//     } catch (e) {
//       throw e.response.data.message;
//     }
//   },
};
