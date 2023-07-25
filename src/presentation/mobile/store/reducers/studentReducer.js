import {
  AUTHENTICATE,
  GETATTENDENCE,
  ISABSENT,
  ISPRESENT,
} from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISPRESENT:
      const selectedPresentStudent = state.students.findIndex(
        (student) => student.studentId == action.id
      );
      console.log(selectedPresentStudent);
      state.students[selectedPresentStudent].isPresentOne = true;
      console.log(state.students[selectedPresentStudent].isPresentOne);
      return state;
    case ISABSENT:
      const selectedAbsentStudent = state.students.findIndex(
        (student) => student.studentId == action.id
      );

      state.students[selectedAbsentStudent].isPresentOne = false;
      console.log(state.students[selectedAbsentStudent].isPresentOne);
      return state;
    case GETATTENDENCE:
      return { students: [...action.studentData] };

    default:
      return state;
  }
};
export default studentReducer;
