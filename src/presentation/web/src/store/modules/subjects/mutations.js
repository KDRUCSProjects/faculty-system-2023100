export default {
  setSubjects(state, payload) {
    state.subjects = payload;
  },
  saveSubject(state, newlyAddedSubject) {
    state.subjects.unshift(newlyAddedSubject);
  },
  updateSubject(state, updatedSubjectInfo) {
    state.subjects = state.subjects.filter((subject) => {
      if (subject.id === updatedSubjectInfo.id) {
        // Update account
        subject.name = updatedSubjectInfo.name;
      }

      return subject;
    });
  },
  removeSubject(state, subjectId) {
    state.subjects = state.subjects.filter((subject) => subject.id !== subjectId);
  },
  setShoka(state, payload) {
    state.currentShoka = payload;
  },
};
