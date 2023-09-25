const Joi = require('joi');

const registerStudent = {
  body: Joi.object().keys({
    kankorId: Joi.string().required('KankorId is required'),
    fullName: Joi.string(),
    nickName: Joi.string().allow(''),
    fatherName: Joi.string(),
    grandFatherName: Joi.string(),
    province: Joi.string().allow(''),
    division: Joi.string().allow(''),
    district: Joi.string().allow('').optional(),
    engName: Joi.string().allow(''),
    engLastName: Joi.string().allow(''),
    engFatherName: Joi.string().allow(''),
    engGrandFatherName: Joi.string().allow(''),
    educationalYear: Joi.date(),
    admissionYear: Joi.number().positive().integer(),
    photo: Joi.string().allow(null).allow(''),
    dob: Joi.date(),
    gender: Joi.string().valid('male', 'female'),
    tazkeraNumber: Joi.number().integer().positive().allow(''),
    birthCity: Joi.string().allow(''),
    birthCountry: Joi.string().allow(''),
    phoneNumber: Joi.number().integer().positive().allow(''),
    kankorMarks: Joi.number().positive().allow(''),
    kankorType: Joi.string().valid('pass14', 'general').required('kankor type is required'),
    birthCityEnglish: Joi.string().allow(''),
    birthCountryEnglish: Joi.string().allow(''),
    bankAccount: Joi.string().allow(''),
    csId: Joi.string().allow(''),
    schoolName: Joi.string().allow(''),
    schoolGraduationYear: Joi.number().allow(''),
    monographTitle: Joi.string().allow(''),
    monographDefenseDate: Joi.date().allow(''),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.number().positive().integer().required(),
  }),
  body: Joi.object()
    .keys({
      kankorId: Joi.string(),
      fullName: Joi.string(),
      nickName: Joi.string().allow(''),
      fatherName: Joi.string(),
      grandFatherName: Joi.string(),
      province: Joi.string().allow(''),
      division: Joi.string().allow(''),
      district: Joi.string().allow('').optional(),
      engName: Joi.string().allow(''),
      engLastName: Joi.string().allow(''),
      engFatherName: Joi.string().allow(''),
      engGrandFatherName: Joi.string().allow(''),
      educationalYear: Joi.date(),
      admissionYear: Joi.number().positive().integer(),
      photo: Joi.string().allow(null).allow(''),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
      tazkeraNumber: Joi.number().integer().positive().allow(''),
      birthCity: Joi.string().allow(''),
      birthCountry: Joi.string().allow(''),
      phoneNumber: Joi.number().integer().positive().allow(''),
      kankorMarks: Joi.number().positive().allow(''),
      kankorType: Joi.string().valid('pass14', 'general'),
      birthCityEnglish: Joi.string().allow(''),
      birthCountryEnglish: Joi.string().allow(''),
      bankAccount: Joi.string().allow(''),
      csId: Joi.string().allow(''),
      schoolName: Joi.string().allow(''),
      schoolGraduationYear: Joi.number().allow(''),
      monographTitle: Joi.string().allow(''),
      monographDefenseDate: Joi.date().allow(''),
    })
    .min(1)
    .required(),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.number().positive().integer().required(),
  }),
};

const kankor = {
  params: Joi.object().keys({
    kankorId: Joi.string().required(),
  }),
};

const deleteStudents = {
  body: Joi.array()
    .items({
      studentId: Joi.number().positive().integer().required(),
    })
    .min(1),
};

const tempToken = {
  params: Joi.object().keys({
    token: Joi.number()
      .integer()
      .min(100000)
      .max(999999)
      .messages({ 'number.min': 'token should be six digits', 'number.max': 'token should be six digits' }),
  }),
  body: Joi.object()
    .keys({
      kankorId: Joi.string().required('KankorId is required'),
      fullName: Joi.string(),
      nickName: Joi.string().allow(''),
      fatherName: Joi.string(),
      grandFatherName: Joi.string(),
      province: Joi.string().allow(''),
      division: Joi.string().allow(''),
      district: Joi.string().allow('').optional(),
      engName: Joi.string().allow(''),
      engLastName: Joi.string().allow(''),
      engFatherName: Joi.string().allow(''),
      engGrandFatherName: Joi.string().allow(''),
      educationalYear: Joi.date(),
      admissionYear: Joi.number().positive().integer(),
      photo: Joi.string().allow(null).allow(''),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
      tazkeraNumber: Joi.number().integer().positive().allow(''),
      birthCity: Joi.string().allow(''),
      birthCountry: Joi.string().allow(''),
      phoneNumber: Joi.number().integer().positive().allow(''),
      kankorMarks: Joi.number().positive().allow(''),
      kankorType: Joi.string().valid('pass14', 'general').required('kankor type is required'),
      birthCityEnglish: Joi.string().allow(''),
      birthCountryEnglish: Joi.string().allow(''),
      bankAccount: Joi.string().allow(''),
      csId: Joi.string().allow(''),
      schoolName: Joi.string().allow(''),
      schoolGraduationYear: Joi.number().allow(''),
      monographTitle: Joi.string().allow(''),
      monographDefenseDate: Joi.date().allow(''),
    })
    .min(1)
    .required(),
};

const createStudentSchool = {
  params: Joi.object().keys({
    studentId: Joi.number().positive().integer().required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    graduationDate: Joi.date().iso().required(),
  }),
};

const createStudentMonograph = {
  params: Joi.object().keys({
    studentId: Joi.number().positive().integer().required(),
  }),
  body: Joi.object().keys({
    researchTitle: Joi.string().required(),
    defenseDate: Joi.date().iso().required(),
  }),
};

module.exports = {
  kankor,
  tempToken,
  getStudent,
  updateStudent,
  deleteStudents,
  registerStudent,
  createStudentSchool,
  createStudentMonograph,
};
