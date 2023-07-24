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
    admissionYear: Joi.date(),
    photo: Joi.string().allow(null),
    dob: Joi.date(),
    gender: Joi.string().valid('male', 'female'),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
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
      admissionYear: Joi.date(),
      photo: Joi.string().allow(null),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
    })
    .min(1)
    .required(),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
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
      studentId: Joi.number(),
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
      admissionYear: Joi.date(),
      photo: Joi.string().allow(null),
      dob: Joi.date(),
      gender: Joi.string().valid('male', 'female'),
    })
    .min(1)
    .required(),
};

module.exports = {
  kankor,
  tempToken,
  getStudent,
  updateStudent,
  deleteStudents,
  registerStudent,
};
