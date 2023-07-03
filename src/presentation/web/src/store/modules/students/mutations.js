export default {
  setStudents(state, payload) {
    state.students = payload;
  },
  setStudentsList(state, payload) {
    state.studentsList = payload;
  },
  setCounts(state, options) {
    state.counts = options;
  },
  saveStudent(state, newlyAddedStudent) {
    state.students.unshift(newlyAddedStudent);
  },
  setStudent(state, student) {
    state.currentStudent = student;
  },
  updateStudent(state, { fields, update }) {
    state.students = state.students.filter((student) => {
      if (student.id === fields.studentId) {
        const keys = Object.keys(fields);

        keys.forEach((key) => {
          student[key] = update[key];
        });
      }

      console.log(student);

      return student;
    });
  },
};
