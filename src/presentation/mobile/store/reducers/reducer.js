import { AUTHENTICATE } from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {
  userid: null,
  token: null,
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userid: action.userid,
        token: action.token,
      };
    case LOGOUT:
      return { initialState };

    default:
      return state;
  }
};
export default MainReducer;
