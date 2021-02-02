const Joi = require("joi");

// Signup validation
const signupValidation = (data) => {
  const SignupSchemaValidation = {
    name: Joi.string().required().empty().min(3),
    email: Joi.string().required().email(),
    role: Joi.string().required().empty(),
    password: Joi.string()
      .required()
      .min(7)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirmePassword: Joi.ref("password"),
  };
  return Joi.valid(data, SignupSchemaValidation);
};
// Login validation
const loginValidation = (data) => {
  const LoginSchemaValidation = {
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .min(7)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  };
  Joi.validate(data, LoginSchemaValidation);
};
module.exports = {
  signupValidation,
  loginValidation,
};
