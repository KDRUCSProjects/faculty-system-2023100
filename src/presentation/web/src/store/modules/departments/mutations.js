export default {
    setDepartment(state, payload) {
      console.log(payload)
      state.departments = payload;
      console.log(state)
    },
    saveDepartment(state, newDepartment) {
      state.departments.unshift(newDepartment);
    },
    updateDepartment(state, updatedDepartment) {
      state.departments = state.departments.filter((department) => {
        if (department.id === updatedDepartment.id) {
          // Update account
          department.name = this.updateDepartment.name;
          department.lastName = this.updateDepartment.lastName;
          department.email = this.updateDepartment.email;
          department.photo = this.updateDepartment.photo;
        }
  
        return department;
      });
    },
    removeTeacher(state, departmentId) {
      state.departments = state.departments.filter((department) => department.id !== departmentId);
    },
  };
  