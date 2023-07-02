export default {
    departments(state) {
      console.log('getter department')
      return state.departments;
    },
    departmentById: (state) => (departmentId) => {
      return state.departments.find((department) => department.id === departmentId);
    },
  };
  