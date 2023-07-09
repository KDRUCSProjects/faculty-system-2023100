export default {
    setDepartment(state, payload) {
      console.log(payload)
      state.departments = payload;
      console.log(state)
    },
    saveDepartment(state, newDepartment) {
      state.departments.unshift(newDepartment);
    },

    editDepartment(state, updatedDepartment) {
      console.log('mutation deparmtn')
      state.departments = state.departments.filter((department) => {
        if (department.id === updatedDepartment.id) {
          // Update Dapartment
          department.name = this.updateDepartment.name;
        }
  
        return department;
      });
    },
    removeDepartment(state, departmentId) {
      console.log(state, departmentId)
      state.departments = state.departments.filter((department) => department.id !== departmentId);
    },
  };
  