import { AUTHENTICATE } from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {
  students: [
    [1, "khan"],
    [2, "Zabih"],
    [3, "Naveed"],
    [4, "ahmad"],
    [5, "wahid"],
    [6, "karim"],
  ],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    // case AUTHENTICATE:
    //   return {
    //     userid: action.userid,
    //     token: action.token,
    //   };
    // case LOGOUT:
    //   return { initialState };

    default:
      return state;
  }
};
export default studentReducer;
