export default {
  userId(state) {
    return state.userId;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  email(state) {
    return state.email;
  },
  userData(state) {
    return state.userData;
  },
};
