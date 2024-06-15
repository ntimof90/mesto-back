const bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, errors, mongoDublicatErrorCode } = require('../config');

exports.signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash });
    user.password = undefined;
    return res.status(200).json(user);
  } catch (e) {
    if (e.code === mongoDublicatErrorCode) {
      return next(createHttpError(...errors.dublicatUser));
    }
    if (e instanceof mongoose.Error.ValidationError) {
      return next(createHttpError(...errors.invalidUser));
    }
    return next(e);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw createHttpError(...errors.unauth);
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      throw createHttpError(...errors.unauth);
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    return res.status(200).send(token);
  } catch (e) {
    return next(e);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    return next(e);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw createHttpError(...errors.unfoundUser);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e instanceof mongoose.Error.CastError) {
      return next(createHttpError(...errors.unfoundUser));
    }
    return next(e);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.me._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw createHttpError(...errors.unfoundUser);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(createHttpError(...errors.invalidProfile));
    }
    return next(e);
  }
};

exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.me._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      throw createHttpError(...errors.unfoundUser);
    }

    return res.status(200).json(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(createHttpError(...errors.invalidAvatar));
    }
    return next(e);
  }
};
