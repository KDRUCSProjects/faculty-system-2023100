import {
  AUTHENTICATE,
  GETATTENDENCE,
  GETSTUDENTSBYSUBJECT,
  ISABSENT,
  ISPRESENT,
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

    default:
      return state;
  }
};
export default studentsBySubject;
