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
import { base_ip } from "@env";
import { useNavigation } from "@react-navigation/native";

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

      if (response.status == 401) {
        throw new Error("UserName or Password Is Wong!");
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
        "http://" + base_ip + ":4000/subjects/teachers/" + userid,
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
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/attendance/" + subjectId + "?type=" + type,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          studentId: studentId,
          status: true,
        }),
      },
      5000
    );
    console.log(updateResp.status);
    const code = await updateResp.status;
    if (code == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();
    console.log(data);

    if (code == 403) {
      throw new Error("cant change student status!");
    }
    if (updateResp.status != 200 || updateResp.status != 202) {
      console.log("error");
    }
    console.log(studentId);
    dispatch({ type: ISPRESENT, id: studentId });
  };
};

export const isAbsent = (subjectId, studentId, type) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { token } = transformedData;
    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/attendancee/" + subjectId + "?type=" + type,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          studentId: studentId,
          status: false,
        }),
      },
      5000
    );
    const code = await updateResp.status;

    const data = await updateResp.json();
    console.log(data);

    if (code == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }
    if (code == 403) {
      throw new Error("cant change student status!");
    }
    if (code != 200 || code != 202) {
      console.log("error");
    }

    dispatch({ type: ISABSENT, id: studentId });
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
    const code = await updateResp.status;
    if (code == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }

    const data = await updateResp.json();
    console.log(data);

    if (code == 403) {
      throw new Error("cant save status!");
    }
    if (updateResp.status != 200 || updateResp.status != 202) {
      console.log("error");
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
    form.append("name", userName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("photo", photo);

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

    console.log(updateResp.status);

    if (updateResp.status == 400) {
      throw new Error("Email already taken");
    }
    if (updateResp.status == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }
    const updateRespData = await updateResp.json();
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
        "http://" + base_ip + ":4000/students/kankor/" + id,
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

    let data = await updateResp.json();
    data = data.students;

    const code = await updateResp.status;
    if (code == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }

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

export const getStudentBySubject = (subjectId) => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");

    const transformedData = JSON.parse(userData);
    const { userPassword, subjects, token, userId, expirationDate } =
      transformedData;

    const updateResp = await FetchWithTimeout(
      "http://" + base_ip + ":4000/subjects/students/" + subjectId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      },
      5000
    );
    let data = await updateResp.json();

    const code = await updateResp.status;
    if (code == 401) {
      const error = new Error("Please relogin");
      error.code = 401;
      throw error;
    }
    const studentData = new Array();
    data.forEach((element) => {
      studentData.push({
        studentId: element.studentId,
        studentName: element.studentName,
        nickName: element.nickName,
        fatherName: element.fatherName,

        grandFatherName: element.grandFatherName,
        date: element.date,
        shamsiDate: element.shamsiDate,
        isPresentOne: 0,
        isPresentTwo: 0,
      });
    });

    console.log(studentData);

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
