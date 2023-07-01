import { toDateFormat } from '@/utils/date';

export default {
  students(state) {
    return state.students.filter((student) => {
      student.createdAt = toDateFormat(student.createdAt);

      // Static status
      student.status = 'reserve';
      return student;
    });
  },
  counts(state) {
    return state.counts;
  },
  currentStudent(state) {
    return state.currentStudent;
  },
};
