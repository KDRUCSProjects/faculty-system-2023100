import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const authenticate = (userName, password) => {
  return async (dispatch) => {
    const response = await fetch("http://192.168.1.100:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userName,
        password: password,
      }),
    });

    if (response.status === 400) {
      throw new Error("UserName and Password Is Required!");
    }
    if (response.status === 401) {
      throw new Error("UserName or Password Is Wrong!");
    }
    if (!response.ok) {
      console.log(response.status);
      throw new Error("something went wrong");
    }
    if (!response.ok) {
      console.log(response.status);
      throw new Error("something went wrong");
    }
    const data = await response.json();
    console.log(data.user.id);
    console.log(data.tokens.access.token);
    const userid = data.user.id;
    const token = data.tokens.access.token;
    const tokenDuration = data.tokens.access.expires;
    console.log(tokenDuration);
    const expirationDate = new Date(
      new Date().getTime() + parseInt(tokenDuration) * 1000
    );
    saveToken(token, userid, expirationDate);
    dispatch({
      type: AUTHENTICATE,

      userid,
      token,
    });
  };
};

// export const authenticate = (userName, password) => {

//   return {
//     type: AUTHENTICATE,

//     userName,
//     password,
//   };
// };
export const logout = () => {
  return { type: LOGOUT };
};

const saveToken = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expirationDate: expirationDate.toISOString(),
    })
  );
};
