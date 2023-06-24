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

    const updatedUserData = { ...state.userData, name: payload.name, lastName: payload.lastName, photo: payload.photo };

    state.userData = updatedUserData;
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  },
  setEmail(state, newEmail) {
    state.email = newEmail;
  },
};
