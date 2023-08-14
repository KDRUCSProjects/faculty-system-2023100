export default {
  currentYearSemesters(state) {
    return state.currentYearSemesters;
  },
  currentPeriodSemesters(state) {
    return state.currentPeriodSemesters;
  },
  currentYear(state) {
    return state.currentYear;
  },
  semester(state) {
    return state.semester;
  },
  currentSemesterStatistics(state) {
    return state.semester?.statistics;
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
  reviewStudents(state) {
    const students = state.reviewStudents;

    const theStudents = students.map((student) => {
      student.student.eligibility = student.eligibility;
      student.student.message = student.message;
      student.student.reason = student.reason;

      if (student.reason) {
        student.student[student.reason] = student.reason;
      }

      return student.student;
    });

    return theStudents;
  },
  selectedPeriodByUser(state) {
    return state.selectedPeriodByUser;
  },
  selectedYearByUser(state) {
    return state.selectedYearByUser;
  },
  statistics(state) {
    return state.statistics;
  },
};
