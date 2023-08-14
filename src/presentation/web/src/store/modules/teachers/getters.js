export default {
  teachersAndAssistants(state) {
    const teachers = state.teachers;
    const sortedTeachers = teachers.sort((b, a) => {
      if (a.role < b.role) {
        return 1;
      } else if (a.role > b.role) {
        return -1;
      } else {
        return 0;
      }
    });

    return sortedTeachers;
  },
  teachers(state) {
    return state.teachers.filter((teacher) => teacher.role === 'user');
  },
  teacherById: (state) => (teacherId) => {
    return state.teachers.find((teacher) => teacher.id === teacherId);
  },
  currentTeacher(state) {
    return state.currentTeacher;
  },
  currentTeacherAssignedSubjects(state) {
    let semesters = state.currentTeacherAssignedSubjects;

    semesters.map((s) => {
      s.subjects.map((sub) => {
        sub.name = sub.subjectName;
        sub.credit = sub.subjectTitle;
        sub.id = sub.subjectId;
        return sub;
      });

      return s;
    });

    return semesters;
  },
};
