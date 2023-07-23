import {
  AUTHENTICATE,
  GETATTENDENCE,
  GETSTUDENTSBYSUBJECT,
  ISABSENT,
  ISPRESENT,
} from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {};

const studentsBySubject = (state = initialState, action) => {
  switch (action.type) {
    case GETSTUDENTSBYSUBJECT:
      return {
        ...action.data,
      };

    default:
      return state;
  }
};
export default studentsBySubject;
