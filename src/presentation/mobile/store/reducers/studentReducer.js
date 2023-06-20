import { AUTHENTICATE, ISABSENT, ISPRESENT } from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {
  students: [
    { id: 1, name: "Abdullah", isPresent: false },
    { id: 2, name: "Zabih", isPresent: false },
    { id: 3, name: "Naveed", isPresent: false },
    { id: 4, name: "ahmad", isPresent: false },
    { id: 5, name: "wahid", isPresent: false },
    { id: 6, name: "karim", isPresent: false },
  ],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ISPRESENT:
      const selectedPresentStudent = state.students.findIndex(
        (student) => student.id == action.studentId
      );
      state.students[selectedPresentStudent].isPresent = true;

      return state;
    case ISABSENT:
      const selectedAbsentStudent = state.students.findIndex(
        (student) => student.id == action.studentId
      );
      state.students[selectedAbsentStudent].isPresent = false;

      return state;

    default:
      return state;
  }
};
export default studentReducer;
