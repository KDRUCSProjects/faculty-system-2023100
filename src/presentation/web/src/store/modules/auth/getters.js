function getUserData(userData, field) {
  if (!userData) return null;

  if (!userData[field]) return null;

  return userData[field];
}

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
  isAdmin(state) {
    return state.userData && state.userData.role === 'admin' ? true : false;
  },
  isTeacher(state) {
    return state.userData && state.userData.role === 'user' ? true : false;
  },
  isExecManager(state) {
    return state.userData && state.userData.role === 'execManager' ? true : false;
  },
  isTeachingManager(state) {
    return state.userData && state.userData.role === 'teachingManager' ? true : false;
  },
  role(state) {
    return state.userData?.role;
  },
  photo(state) {
    return getUserData(state.userData, 'photo');
  },
  fullName(state) {
    return getUserData(state.userData, 'name');
  },
  lastName(state) {
    return getUserData(state.userData, 'lastName');
  },
};
