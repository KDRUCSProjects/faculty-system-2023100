export default {
  setUser(state, payload) {
    state.refreshToken = payload.refreshToken;
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
  setEmail(state, newEmail) {
    state.email = newEmail;
  },
  setProfile(state, payload) {
    state.name = payload.name;
    state.photo = payload.photo;
    state.lastName = payload.lastName;
  },
};
