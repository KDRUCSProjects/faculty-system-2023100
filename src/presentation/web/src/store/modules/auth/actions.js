import axios from 'axios';

export default {
  async auth(context, payload) {
    // The data
    const data = {
      email: payload.email,
      password: payload.password,
    };

    try {
      const response = await axios({
        url: '/api/auth/login',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });

      const responseData = response.data;

      localStorage.setItem('refreshToken', responseData.tokens.refresh.token);
      localStorage.setItem('token', responseData.tokens.access.token);
      localStorage.setItem('userId', responseData.user.id);
      localStorage.setItem('email', responseData.user.email);
      localStorage.setItem('userData', JSON.stringify(responseData.user));

      context.commit('setUser', {
        refreshToken: responseData.refreshToken,
        token: responseData.tokens.access.token,
        userId: responseData.user.id,
        email: responseData.user.email,
        userData: responseData.user,
      });
    } catch (e) {
      console.log(e);
      throw e.response.data.message;
    }
  },
  setUserData(context, payload) {
    localStorage.setItem('userData', JSON.stringify(payload.userData));
    context.commit('setUserData', payload.userData);
  },
  tryLogin(context) {
    const refreshToken = localStorage.getItem('refreshToken');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const userData = localStorage.getItem('userData');

    const data = JSON.parse(userData);

    if (token && userId) {
      context.commit('setUser', {
        refreshToken,
        token,
        userId,
        email,
        userData: data,
      });
    }
  },
  async logout(context) {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('userData');

      context.commit('setUser', {
        refreshToken: null,
        token: null,
        userId: null,
        username: null,
        userData: null,
      });

      // Also, Send a req to the server to remove the token

      await axios({
        url: '/api/auth/logout',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          refreshToken,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};
