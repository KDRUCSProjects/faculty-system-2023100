const Joi = require('joi');

const registerStudent = {
    body: Joi.object().keys({
        kankorId: Joi.string().required(),
        fullname: Joi.string().required(),
        nickname: Joi.string().required(),
        grandFatherName: Joi.string().required(),
        imageUrl: Joi.string().required(),
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


module.exports = {
    registerStudent,
};
