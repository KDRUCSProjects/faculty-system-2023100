export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.email = payload.email;

    // Set user data
    state.userData = payload.userData;
  },
  setUserData(state, payload) {
    // Set user data only
    state.userData = payload;
  },
};
