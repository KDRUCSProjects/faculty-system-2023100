import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchWithTimeout from "../../optimization/FetchWithTimeout";
import { useSelector } from "react-redux";

export const AUTHENTICATE = "AUTHENTICATE";

export const LOGOUT = "LOGOUT";
export const ISPRESENT = "ISPRESENT";
export const SAVEATTENDENCE = "SAVEATTENDENCE";
export const ISABSENT = "ISABSENT";
export const UPDATEACCOUNT = "UPDATEACCOUNT";
export const CHECKPASSWORD = "CHECKPASSWORD";
export const CHANGEPASSWORD = "CHANGEPASSWORD";
export const GETSTUDENTINFO = "GETSTUDENTINFO";

export const authenticate = (userName, password) => {
  return async (dispatch) => {
    try {
      const response = await FetchWithTimeout(
        "http://192.168.1.104:4000/auth/login",
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

      const Name = data.user.name;
      const userLastName = data.user.lastName;
      const userPhoto = data.user.photo;
      const userEmail = data.user.email;

      const tokenDuration = data.tokens.access.expires;
      console.log(tokenDuration);
      const expirationDate = new Date(
        new Date().getTime() + parseInt(tokenDuration) * 1000
      );

      const subjectsresp = await FetchWithTimeout(
        "http://192.168.1.104:4000/subjects/teachers/" + userid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
        5000
      );
      const subjects = await subjectsresp.json();

      const photoUri = "http://192.168.1.104:4000/storage/images/" + userPhoto;

      saveToken(
        userid,
        Name,
        userLastName,
        userEmail,

        userPhoto,
        photoUri,
        subjects,
        token,
        expirationDate
      );

      dispatch({
        type: AUTHENTICATE,

        userid,
        Name,
        userLastName,
        userEmail,
        userPhoto,
        photoUri,
        subjects,
        token,
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

export const localAuth = (
  userid,
  Name,
  userLastName,
  userEmail,
  userPhoto,
  photoUri,
  subjects,
  token
) => {
  return async (dispatch) =>
    dispatch({
      type: AUTHENTICATE,
      userid,
      Name,
      userLastName,
      userEmail,
      userPhoto,
      photoUri,
      subjects,
      token,
    });
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

export const updateAccount = (userName, lastName, email, photo) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { subjects, token, userId, expirationDate } = transformedData;
    const expDate = new Date(expirationDate);

    console.log(photo);

    const form = new FormData();
    form.append("name", userName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("photo", photo);

    const updateResp = await FetchWithTimeout(
      "http://192.168.1.104:4000/auth/updateProfile",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
        body: form,
      },
      5000
    );

    console.log(updateResp.status);

    if (updateResp.status == 400) {
      throw new Error("Email already taken");
    }
    if (updateResp.status == 401) {
      throw new Error("Please relogin to update your info");
    }
    const updateRespData = await updateResp.json();
    const name = updateRespData.photo;
    const photoUri = "http://192.168.1.104:4000/storage/images/" + name;

    saveToken(
      userId,
      userName,
      lastName,
      email,

      name,
      photoUri,
      subjects,
      token,
      expDate
    );

    dispatch({
      type: UPDATEACCOUNT,

      userName,
      lastName,
      email,
      photo,
      photoUri,
    });
  };
};

export const checkPassword = (password) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    const updateResp = await FetchWithTimeout(
      "http://192.168.1.104:4000/auth/checkPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          password: password,
        }),
      },
      5000
    );
    console.log(updateResp.status);

    if (updateResp.status != 200) {
      throw new Error("Please enter correct password");
    }
  };
};

export const changePassword = (
  currentPassword,
  newPassword,
  confirmPassword
) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    const updateResp = await FetchWithTimeout(
      "http://192.168.1.104:4000/auth/change-password",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      },
      5000
    );
    console.log(updateResp.status);

    if (updateResp.status != 200 || updateResp.status != 202) {
      throw new Error("Password Can't be Changed right now, try later");
    }
  };
};

export const getStudentInfo = (id) => {
  return async (dispatch) => {
    console.log(id);

    const promise = new Promise((resolve, reject) => {
      FetchWithTimeout(
        "http://192.168.1.104:4000/students/kankor/" + id,
        {},
        5000
      )
        .then((response) => {
          if (!response.ok) {
            if (response.status == "404") {
              throw new Error("Student not found");
            }
            throw new Error(response.status);
          }

          return response.json();
        })
        .then((data) => {
          if (data.kankorId) {
            resolve(data);
          } else {
          }
        })
        .catch((err) => {
          reject(err);
        });
    });

    return promise;
    // const response =  FetchWithTimeout("http://192.168.1.104:4000/students/kankor/"+id, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },

    // },5000);

    // console.log(response.status);

    // if (response.status === 400) {
    //   throw new Error("400");
    // }
    // if (response.status === 401) {
    //   throw new Error("401");
    // }
    // if (!response.ok) {
    //   console.log(response.status);
    //   new Error("something went wrong")

    // }

    // const data =  response.json();
    //  return data;
    // console.log(data);

    //   const studentId = data.id;
    //    const kankorId = data.kankorId;
    //   const fullName = data.fullName;
    //   const fatherName = data.fatherName;
    //   const grandFatherName =
    //     data.grandFatherName;
    //  const educationalYearId = data.educationalYearId;
    //   const admitDate = data.admissionYear;

    // dispatch({
    //   type: GETSTUDENTINFO,

    //   studentId,
    //   kankorId,fullName,
    //   fatherName,
    //   grandFatherName,
    //   educationalYearId,
    //   admitDate
    // });
  };
};

export const createShoka = (
  subjectId,
  studentId,
  midtermMarks,
  assignmentsMarks,
  finalMarks
) => {
  return async (dispatch) => {
    console.log(
      subjectId,
      studentId,
      midtermMarks,
      assignmentsMarks,
      finalMarks
    );
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    const updateResp = await FetchWithTimeout(
      "http://192.168.1.104:4000/shokaList",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          subjectId: subjectId,
          studentId: studentId,
          midtermMarks: midtermMarks,
          assignmentOrProjectMarks: assignmentsMarks,
          finalMarks: finalMarks,
        }),
      },
      5000
    );
    console.log(updateResp.status);
    if (updateResp.status == 406) {
      const error = new Error(
        "Selected student does not exists in this semester"
      );
      error.code = 406;
      throw error;
    }

    if (updateResp.status == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }

    if (updateResp.status != 200 || updateResp.status != 201) {
    }
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

const saveToken = (
  userid,
  Name,
  userLastName,
  userEmail,

  userPhoto,
  uri,
  subjects,
  token,
  expirationDate
) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      userId: userid,
      name: Name,
      lastName: userLastName,
      email: userEmail,

      photo: userPhoto,
      photoUri: uri,
      subjects: subjects,
      token: token,
      expirationDate: expirationDate.toISOString(),
    })
  );
};
