const Joi = require('joi');

// register validator
exports.registerValidator = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    dob: Joi.date().required(),
  });
  return schema.validate(user);
};

// login validator
exports.loginValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  return schema.validate(user);
};

exports.postValidator = (post) => {
  const schema = Joi.object({
    desc: Joi.string().min(3),
  });
  return schema.validate(post);
};
