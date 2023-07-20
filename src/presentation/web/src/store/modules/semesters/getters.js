export default {
  currentYearSemesters(state) {
    return state.currentYearSemesters;
  },
  currentYear(state) {
    return state.currentYear;
  },
  semester(state) {
    return state.semester;
  },
  semesterSubjects(state, _, rootState, rootGetters) {
    let subjects = state.semester?.Subjects;

    // Let's also attach each teacher to the subject
    const subjectsWithTeachers = subjects?.filter((subject) => {
      const teacher = rootGetters['teachers/teacherById'](subject.teacherId);

      teacher ? (subject.teacher = teacher) : (subject.teacher = null);

      return subject;
    });

    return subjectsWithTeachers;
  },
};
