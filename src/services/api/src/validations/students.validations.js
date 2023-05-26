const Joi = require('joi');

const registerStudent = {
  body: Joi.object().keys({
    kankorId: Joi.string().required(),
    fullName: Joi.string().required(),
    nickName: Joi.string(),
    fatherName: Joi.string().required(),
    grandFatherName: Joi.string().required(),
    province: Joi.string(),
    division: Joi.string(),
    district: Joi.string(),
    engName: Joi.string(),
    engFatherName: Joi.string(),
    engGrandFatherName: Joi.string(),
    educationalYear: Joi.number().required(),
    admissionYear: Joi.date(),
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

const kankor = {
  params: Joi.object().keys({
    kankorId: Joi.string().required(),
  }),
};

module.exports = {
  kankor,
  getStudent,
  updateStudent,
  registerStudent,
};
