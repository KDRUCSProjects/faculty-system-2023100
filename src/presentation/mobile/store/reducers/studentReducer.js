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
      if (action.cell == "one") {
        state.students[selectedPresentStudent].isPresentOne = true;
      } else if (action.cell == "two") {
        state.students[selectedPresentStudent].isPresentTwo = true;
      } else {
        state.students[selectedPresentStudent].isPresentOne = true;
        state.students[selectedPresentStudent].isPresentTwo = true;
      }

      console.log(state.students[selectedPresentStudent].isPresentOne);
      return state;
    case ISABSENT:
      const selectedAbsentStudent = state.students.findIndex(
        (student) => student.studentId == action.id
      );
      if (action.cell == "one") {
        state.students[selectedAbsentStudent].isPresentOne = false;
      } else if (action.cell == "two") {
        state.students[selectedAbsentStudent].isPresentTwo = false;
      } else {
        state.students[selectedAbsentStudent].isPresentOne = false;
        state.students[selectedAbsentStudent].isPresentTwo = false;
      }
      console.log(state.students[selectedAbsentStudent].isPresentOne);
      return state;
    case GETATTENDENCE:
      return { students: [...action.studentData] };

    default:
      return state;
  }
};
export default studentReducer;
