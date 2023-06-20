import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchWithTimeout from "../../optimization/FetchWithTimeout";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const ISPRESENT = "ISPRESENT";
export const SAVEATTENDENCE = "SAVEATTENDENCE";
export const ISABSENT = "ISABSENT";

export const authenticate = (userName, password) => {
  return async (dispatch) => {
    try {
      const response = await FetchWithTimeout(
        "http://192.168.1.105:4000/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userName,
            password: password,
          }),
        },
        5000
      );

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
    } catch (e) {
      throw new Error("Network Error");
    }
  };
};

export const isPresent = (studentId) => {
  return { type: ISPRESENT, studentId };
};

export const isAbsent = (studentId) => {
  return { type: ISABSENT, studentId };
};

export const saveAttendence = (students) => {
  return async (dispatch) => {
    //   const response = await fetch("http://192.168.1.105:4000/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: userName,
    //       password: password,
    //     }),
    //   });

    //   if (response.status === 400) {
    //     throw new Error("UserName and Password Is Required!");
    //   }
    //   if (response.status === 401) {
    //     throw new Error("UserName or Password Is Wrong!");
    //   }
    //   if (!response.ok) {
    //     console.log(response.status);
    //     throw new Error("something went wrong");
    //   }

    //   const respoonseData = await response.json();
    //   console.log(respoonseData);

    // dispatch({
    //   type: SAVEATTENDENCE,

    //   students,
    // });
    console.log(students);
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
