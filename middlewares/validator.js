const { celebrate, Joi } = require('celebrate');

exports.auth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

exports.getUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

exports.updateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

exports.updateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .regex(/^(http|https):\/\/(www\.)?([\w-]+\.)+\w+/),
  }),
});
