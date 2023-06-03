import axios from 'axios';

export default {
  async auth(context, payload) {
    // The data
    const data = {
      email: payload.email,
      password: payload.password,
    };

    const response = await axios({
      url: '/auth/login',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });

    // const response = await fetch('/api/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    const responseData = await response.json();

    if (!response.ok) {
      // Throw the error/message that comes from the server
      throw responseData.message;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('email', responseData.email);
    localStorage.setItem('userData', JSON.stringify(responseData.userData));

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      email: responseData.email,
      userData: responseData.userData,
    });
  },
  setUserData(context, payload) {
    localStorage.setItem('userData', JSON.stringify(payload.userData));
    context.commit('setUserData', payload.userData);
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const userData = localStorage.getItem('userData');

    const data = JSON.parse(userData);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        email,
        userData: data,
      });
    }
  },
  async logout(context) {
    try {
      const token = context.rootGetters.token;

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('userData');

      context.commit('setUser', {
        token: null,
        userId: null,
        username: null,
        userData: null,
      });

      // Also, Send a req to the server to remove the token

      const response = await fetch(`/api/users/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Throw the error/message that comes from the server
        throw responseData.msg;
      }
    } catch (e) {
      console.log(e);
    }
  },
  loadTeachers() {
    console.log('bitches');
  },
};
