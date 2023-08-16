import { toDateFormat } from '@/utils/date';

export default {
  students(state, getters, rootState, rootGetters) {
    return state.students.filter((student) => {
      student.createdAt = toDateFormat(student.createdAt);

      // Static status
      // student.status = 'reserve';
      // Convert kankorYear (educationalYearId) to real value
      student.kankorYear = rootGetters['years/yearById'](student.educationalYearId)?.year;
      return student;
    });
  },
  allStudents(state) {
    return state.allStudents;
  },
  reservedStudents(state) {
    return state.reservedStudents;
  },
  studentsList(state) {
    return state.studentsList.filter((student) => {
      student.createdAt = toDateFormat(student.createdAt);

      // Static status
      student.status = 'present';
      return student;
    });
  },
  counts(state) {
    return state.counts;
  },
  currentStudent(state) {
    return state.currentStudent;
  },
  searchedStudent(state) {
    return state.searchedStudent;
  },
};
