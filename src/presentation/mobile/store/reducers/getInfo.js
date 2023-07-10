import { GETSTUDENTINFO } from "../actions/actions";


const initialState = {
  students: {
    studentId:null,
    kankorId:null,
    fullName:null,
    fatherName:null,
    grandFatherName:null,
    educationalYearId:null,
    admitDate:null,
  },
};

const GetInfo = (state = initialState, action) => {
  switch (action.type) {
    case GETSTUDENTINFO:
      

      return {
        studentId:action.studentId,
        kankorId:action.kankorId,
        fullName:action.fullName,
        fatherName:action.fatherName,
        grandFatherName:action.grandFatherName,
        educationalYearId:action.educationalYearId,
        admitDate:action.admitDate,
      };
  

    default:
      return state;
  }
};
export default GetInfo;