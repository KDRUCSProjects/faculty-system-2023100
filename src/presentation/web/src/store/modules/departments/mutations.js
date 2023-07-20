import updateDepartmentVue from "@/components/departments/updateDepartment.vue";
import departments from ".";

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
      console.log(updatedDepartment)
      state.departments = state.departments.filter((department) => {
        if (department.id === updatedDepartment.id) {
          // Update Dapartment
          console.log(department, updatedDepartment)
          department.name = updatedDepartment.name;

        }
        return department;
      });
      
    },
    removeDepartment(state, departmentId) {
      console.log(state, departmentId)
      state.departments = state.departments.filter((department) => department.id !== departmentId);
    },
  };
  