export default {
  subjects(state) {
    return state.subjects;
  },
  subjectById: (state) => (subjectId) => {
    return state.subjects.find((subject) => subject.id === subjectId);
  },
  currentShoka(state) {
    if (state.currentShoka.length === 0) return [];
    return state?.currentShoka?.map((shoka) => {
      shoka.total =
        (shoka.practicalWork || 0) + (shoka.assignment || 0) + (shoka.projectMarks || 0) + (shoka.finalMarks || 0);

      return shoka;
    });
  },
  currentAttendance(state) {
    return state.currentAttendance;
  },
};
