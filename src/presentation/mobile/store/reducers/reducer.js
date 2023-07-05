import { AUTHENTICATE, LOADSUBJECTS, UPDATEACCOUNT } from "../actions/actions";
import { LOGOUT } from "../actions/actions";

const initialState = {
  userid: null,
  userName: null,
  lastName: null,
  email: null,
  photo: null,
  photoUri: null,
  subjects: null,
  token: null,
};

const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userid: action.userid,
        userName: action.Name,
        lastName: action.userLastName,
        email: action.userEmail,
        photo: action.userPhoto,
        photoUri: action.photoUri,
        subjects: action.subjects,
        token: action.token,
      };
    case UPDATEACCOUNT:
      console.log(action.userName);
      const id = state.userid;
      const subjects = state.subjects;
      const token = state.token;
      return {
        ...state,
        userName: action.userName,
        lastName: action.lastName,
        email: action.email,
        photo: action.photo,
        photoUri: action.photoUri,
      };
    case LOGOUT:
      return { initialState };

    default:
      return state;
  }
};
export default MainReducer;
