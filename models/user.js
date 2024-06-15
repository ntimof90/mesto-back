const { default: mongoose, Schema } = require('mongoose');
const { isEmail, isURL } = require('validator');

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: isEmail,
        message: 'Неверный email.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Имя',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'О себе',
    },
    avatar: {
      type: String,
      validate: {
        validator: isURL,
        message: 'Неверный url-адрес.',
      },
    },
  },
  {
    versionKey: false,
  },
);

const User = mongoose.model('user', schema);

User.createIndexes();

module.exports = User;
