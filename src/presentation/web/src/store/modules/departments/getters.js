export default {
    departments(state) {
      return state.departments;
    },
    departmentById: (state) => (departmentId) => {
      return state.departments.find((department) => department.id === departmentId);
    },
  };
  