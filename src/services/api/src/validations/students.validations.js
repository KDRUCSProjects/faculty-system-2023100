const Joi = require('joi');

const registerStudent = {
  body: Joi.object().keys({
    kankorId: Joi.string().required(),
    fullname: Joi.string().required(),
    nickname: Joi.string().required(),
    fatherName: Joi.string().required(),
    grandFatherName: Joi.string().required(),
    province: Joi.string().required(),
    division: Joi.string().required(),
    district: Joi.string().required(),
    engName: Joi.string().required(),
    engFatherName: Joi.string().required(),
    engGrandFatherName: Joi.string().required(),
    educationalYear: Joi.date().required(),
    admissionYear: Joi.date().required(),
  }),
};

const updateStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      kankorId: Joi.string(),
      fullname: Joi.string(),
      nickname: Joi.string(),
      fatherName: Joi.string(),
      grandFatherName: Joi.string(),
      imageUrl: Joi.string(),
      province: Joi.string(),
      division: Joi.string(),
      district: Joi.string(),
      engName: Joi.string(),
      engFatherName: Joi.string(),
      engGrandFatherName: Joi.string(),
      educationalYear: Joi.date(),
      admissionYear: Joi.date(),
    })
    .min(1)
    .required(),
};

const getStudent = {
  params: Joi.object().keys({
    studentId: Joi.string().required(),
  }),
};

module.exports = {
  getStudent,
  updateStudent,
  registerStudent,
};
