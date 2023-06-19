export default {
  setTeachers(state, payload) {
    state.teachers = payload;
  },
  saveTeacher(state, newlyAddedTeacher) {
    state.teachers.unshift(newlyAddedTeacher);
  },
  updateTeacher(state, updatedTeacherInfo) {
    state.teachers = state.teachers.filter((teacher) => {
      if (teacher.id === updatedTeacherInfo.id) {
        // Update account
        teacher.name = updatedTeacherInfo.name;
        teacher.lastName = updatedTeacherInfo.lastName;
        teacher.email = updatedTeacherInfo.email;
      }

      return teacher;
    });
  },
  removeTeacher(state, teacherId) {
    state.teachers = state.teachers.filter((teacher) => teacher.id !== teacherId);
  },
};
