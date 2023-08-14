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
export const GETATTENDENCE = "GETATTENDENCE";
export const GETSTUDENTSBYSUBJECT = "GETSTUDENTSBYSUBJECT";

import { useNavigation } from "@react-navigation/native";
const base_ip = process.env.REACT_APP_base_ip;

export const authenticate = (userName, password) => {
  return async (dispatch) => {
    console.log(base_ip);
    try {
      const response = await FetchWithTimeout(
        "http://" + base_ip + ":4000/auth/login",
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

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message);
        error.code = data.code;
        throw error;
      }

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
        "http://" + base_ip + ":4000/subjects/teachers/" + userid + "?all=0",
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

      const photoUri =
        "http://" + base_ip + ":4000/storage/images/" + userPhoto;

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
      throw new Error(e.message);
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
export const isPresent = (subjectId, studentId, type) => {
  return async (dispatch) => {
    // const userData = await AsyncStorage.getItem("userData");

    // const transformedData = JSON.parse(userData);
    // const { token } = transformedData;
    // const updateResp = await FetchWithTimeout(
    //   "http://" + base_ip + ":4000/attendance/" + subjectId + "?type=" + type,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //     body: JSON.stringify({
    //       studentId: studentId,
    //       status: true,
    //     }),
    //   },
    //   5000
    // );
    // console.log(updateResp.status);
    // if (updateResp.status == 401) {
    //   const error = new Error("please reauthenticate");
    //   error.code = 401;
    //   throw error;
    // }

    // const data = await updateResp.json();

    // if (!updateResp.ok) {
    //   const error = new Error(data.message);
    //   error.code = data.code;
    //   throw error;
    // }

    console.log(type);
    dispatch({ type: ISPRESENT, id: studentId, cell: type });
  };
};

export const isAbsent = (subjectId, studentId, type) => {
  return async (dispatch) => {
    // const userData = await AsyncStorage.getItem("userData");

    // const transformedData = JSON.parse(userData);
    // const { token } = transformedData;
    // const updateResp = await FetchWithTimeout(
    //   "http://" + base_ip + ":4000/attendance/" + subjectId + "?type=" + type,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //     body: JSON.stringify({
    //       studentId: studentId,
    //       status: false,
    //     }),
    //   },
    //   5000
    // );

    // if (updateResp.status == 401) {
    //   const error = new Error("please reauthenticate");
    //   error.code = 401;
    //   throw error;
    // }

    // const data = await updateResp.json();
    // console.log(data);

    // if (!updateResp.ok) {
    //   const error = new Error(data.message);
    //   error.code = data.code;
    //   throw error;
    // }
    console.log(type);
    dispatch({ type: ISABSENT, id: studentId, cell: type });
  };
};

export const saveAttendence = (subjectId, students, type) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const updateResp = await FetchWithTimeout(
      "http://" +
        base_ip +
        ":4000/attendance/todaysAttendance/" +
        subjectId +
        "?type=" +
        type,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ students: students }),
      },
      5000
    );
    console.log(updateResp.status);
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();

    if (!updateResp.ok) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
    //dispatch({ type: ISPRESENT, id: studentId });
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
    if (photo) {
      form.append("name", userName);
      form.append("lastName", lastName);
      form.append("email", email);
      form.append("photo", photo);
    } else {
      form.append("name", userName);
      form.append("lastName", lastName);
      form.append("email", email);
    }

    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/auth/updateProfile",
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
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();
    console.log(data);

    if (!updateResp.ok) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
    const updateRespData = data;
    const name = updateRespData.photo;
    const photoUri = "http://" + base_ip + ":4000/storage/images/" + name;

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
      "http://" + base_ip + ":4000/auth/checkPassword",
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
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    // const data = await updateResp.json();
    // const code = await updateResp.status;

    // if (code != 200) {
    //   const error = new Error(data.message);
    //   error.code = data.code;
    //   throw error;
    // }
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
    const { token } = transformedData;
    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/auth/change-password",
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
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();
    console.log(data);
    if (updateResp.status == 401) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
    if (updateResp.status == 406) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
  };
};

export const getStudentInfo = (id) => {
  return async (dispatch) => {
    console.log(id);

    const promise = new Promise((resolve, reject) => {
      FetchWithTimeout(
        "http://" + base_ip + ":4000/students/kankor/" + id,
        {},
        5000
      )
        .then((response) => {
          if (!response.ok) {
            if (response.status == 401) {
              const error = new Error("please reauthenticate");
              error.code = 401;
              throw error;
            }

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
  projectMarks,
  assignmentsMarks,
  finalMarks,
  practicalMarks,
  status
) => {
  return async (dispatch) => {
    console.log(
      subjectId,
      studentId,
      projectMarks,
      assignmentsMarks,
      finalMarks,
      practicalMarks,
      status
    );
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    let updateResp;
    console.log(status == "first");
    if (status == "first") {
      updateResp = await FetchWithTimeout(
        "http://" + base_ip + ":4000/shokaList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            subjectId: subjectId,
            studentId: studentId,
            projectMarks: projectMarks,
            assignment: assignmentsMarks,
            finalMarks: finalMarks,
            practicalWork: practicalMarks,
          }),
        },
        5000
      );
    } else if (status == "second") {
      updateResp = await FetchWithTimeout(
        "http://" + base_ip + ":4000/shokaList?chance=2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            subjectId: subjectId,
            studentId: studentId,
            projectMarks: projectMarks,
            assignment: assignmentsMarks,
            finalMarks: finalMarks,
            practicalWork: practicalMarks,
          }),
        },
        5000
      );
    } else {
      updateResp = await FetchWithTimeout(
        "http://" + base_ip + ":4000/shokaList?chance=3",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            subjectId: subjectId,
            studentId: studentId,
            projectMarks: projectMarks,
            assignment: assignmentsMarks,
            finalMarks: finalMarks,
            practicalWork: practicalMarks,
          }),
        },
        5000
      );
    }
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();

    if (!updateResp.ok) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
  };
};

export const getAttendence = (id) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/attendance/todaysAttendance/" + id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      5000
    );
    console.log(updateResp.status);

    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    let data = await updateResp.json();

    if (!updateResp.ok) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
    data = data.students;

    const studentData = new Array();
    data.forEach((element) => {
      let isPresentOne = false;
      let isPresentTwo = false;
      if (element.isPresentOne != 0) {
        isPresentOne = true;
      }
      if (element.isPresentTwo != 0) {
        isPresentTwo = true;
      }
      studentData.push({
        studentId: element.studentId,
        studentName: element.studentName,
        nickName: element.nickName,
        fatherName: element.fatherName,

        grandFatherName: element.grandFatherName,
        date: element.date,
        shamsiDate: element.shamsiDate,
        isPresentOne: isPresentOne,
        isPresentTwo: isPresentTwo,
      });
    });

    //console.log(studentData);

    dispatch({ type: GETATTENDENCE, studentData });
  };
};

export const getStudentBySubject = (subjectId, chance) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    const updateResp = await FetchWithTimeout(
      "http://" +
        base_ip +
        ":4000/shokaList/" +
        subjectId +
        "?chance=" +
        chance,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      5000
    );
    if (updateResp.status == 401) {
      const error = new Error("please reauthenticate");
      error.code = 401;
      throw error;
    }

    let data = await updateResp.json();

    const code = await updateResp.status;

    if (!updateResp.ok) {
      const error = new Error(data.message);
      error.code = data.code;
      throw error;
    }
    const studentData = new Array();
    data.forEach((element) => {
      studentData.push({
        studentId: element.studentId,
        studentName: element.fullName,

        fatherName: element.fatherName,
      });
    });

    console.log(data);

    dispatch({ type: GETSTUDENTSBYSUBJECT, studentData });
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
