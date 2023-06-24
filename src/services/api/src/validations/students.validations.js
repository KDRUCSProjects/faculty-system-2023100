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
    photo: Joi.string(),
    dob: Joi.date(),
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
      district: Joi.string(),
      engName: Joi.string(),
      engFatherName: Joi.string(),
      engGrandFatherName: Joi.string(),
      educationalYear: Joi.date(),
      admissionYear: Joi.date(),
      photo: Joi.string(),
      dob: Joi.date(),
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

module.exports = {
  kankor,
  getStudent,
  updateStudent,
  deleteStudents,
  registerStudent,
};
