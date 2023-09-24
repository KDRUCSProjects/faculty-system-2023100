const Joi = require('joi');

const registerStudent = {
  body: Joi.object().keys({
    kankorId: Joi.string().required(),
    fullName: Joi.string().required(),
    nickName: Joi.string(),
    fatherName: Joi.string().required(),
    grandFatherName: Joi.string().required(),
    province: Joi.string(),
    division: Joi.string().allow('').optional(),
    district: Joi.string(),
    engName: Joi.string(),
    engLastName: Joi.string(),
    engFatherName: Joi.string(),
    engGrandFatherName: Joi.string(),
    educationalYear: Joi.number().required(),
    admissionYear: Joi.number().positive().integer(),
    photo: Joi.string().allow(null),
    dob: Joi.date(),
    gender: Joi.string().valid('male', 'female'),
    tazkeraNumber: Joi.number().integer().positive(),
    birthCity: Joi.string(),
    birthCountry: Joi.string(),
    phoneNumber: Joi.number().integer().positive(),
    kankorMarks: Joi.number().positive(),
    kankorType: Joi.string().valid('pass14', 'general'),
    birthCityEnglish: Joi.string(),
    birthCountryEnglish: Joi.string(),
    bankAccount: Joi.string(),
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
      nickName: Joi.string(),
      fatherName: Joi.string(),
      grandFatherName: Joi.string(),
      province: Joi.string(),
      division: Joi.string(),
      district: Joi.string().allow('').optional(),
      engName: Joi.string(),
      engLastName: Joi.string(),
      engFatherName: Joi.string(),
      engGrandFatherName: Joi.string(),
      educationalYear: Joi.date(),
      admissionYear: Joi.number().positive().integer(),
      photo: Joi.string().allow(null),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
      tazkeraNumber: Joi.number().integer().positive(),
      birthCity: Joi.string(),
      birthCountry: Joi.string(),
      phoneNumber: Joi.number().integer().positive(),
      kankorMarks: Joi.number().positive(),
      kankorType: Joi.string().valid('pass14', 'general'),
      birthCityEnglish: Joi.string(),
      birthCountryEnglish: Joi.string(),
      bankAccount: Joi.string(),
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
      kankorId: Joi.string().required(),
      fullName: Joi.string().required(),
      nickName: Joi.string(),
      fatherName: Joi.string().required(),
      grandFatherName: Joi.string().required(),
      province: Joi.string(),
      division: Joi.string().allow('').optional(),
      district: Joi.string(),
      engName: Joi.string(),
      engLastName: Joi.string(),
      engFatherName: Joi.string(),
      engGrandFatherName: Joi.string(),
      educationalYear: Joi.number().required(),
      admissionYear: Joi.number().positive().integer(),
      photo: Joi.string().allow(null),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
      tazkeraNumber: Joi.number().integer().positive(),
      birthCity: Joi.string(),
      birthCountry: Joi.string(),
      phoneNumber: Joi.string(),
      kankorMarks: Joi.number().positive(),
      kankorType: Joi.string().valid('pass14', 'general'),
      birthCityEnglish: Joi.string(),
      birthCountryEnglish: Joi.string(),
      bankAccount: Joi.string(),
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
