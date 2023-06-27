export default {
  subjects(state) {
    return state.subjects;
  },
  subjectById: (state) => (subjectId) => {
    return state.subjects.find((subject) => subject.id === subjectId);
  },
};
