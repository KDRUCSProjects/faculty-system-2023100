import {
  AUTHENTICATE,
  GETATTENDENCE,
  GETSTUDENTSBYSUBJECT,
  ISABSENT,
  ISPRESENT,
  UPDATEMARKS,
} from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {
  students: [],
};

const studentsBySubject = (state = initialState, action) => {
  switch (action.type) {
    case GETSTUDENTSBYSUBJECT:
      console.log("action" + action.studentData);
      return {
        students: action.studentData,
      };
    case UPDATEMARKS:
      const selectedStudent = state.students.filter(
        (student) => student.shokaList == action.shokaList
      );
      console.log(selectedStudent);
      const updatedState = state.students.map((student) => {
        if (student.shokaList == action.shokaList) {
          student.assignment = action.assignment;
          student.finalMarks = action.finalMarks;
          student.practicalWork = action.practicalWork;
          student.projectMarks = action.projectMarks;
        }
        return student;
      });

      return {
        ...state,
        updatedState,
      };
    default:
      return state;
  }
};
export default studentsBySubject;
