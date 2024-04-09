const { response } = require('express');
const User = require('../models/User');
const { generateToken, verifyToken } = require('./tokenController');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const createUser = async (req, res = response) => {
  const { username, email, password, bio, avatar } = req.body

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        error: {
          message: 'User already exists'
        }
      });
    }

    let avatarUrl = "";
    if (avatar) {
      avatarUrl = avatar;
    }
    const createdAt = new Date();
    const updatedAt = new Date();

    user = new User({ username, email, password, bio, avatar: avatarUrl, createdAt, updatedAt });
    user.password = await user.encryptPassword(user.password);
    await user.save();

    res.json({
      ok: true,
      msg: 'registered',
      user: {
        id: user.id, username: user.username, email: user.email, bio: user.bio,
        avatar: user.avatar, createdAt: user.createdAt, updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('[ERROR]', error);

    res.status(500).json({
      ok: false,
      error: {
        message: 'Something went worng, please contact to admin'
      }
    })
  }
};

const updateUser = async (req, res = response) => {
  const userId = req.params.id;
  const { username, bio, avatar } = req.body
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      ok: false,
      error: {
        message: 'Missing Token'
      }
    });
  }

  try {
    token = token.split(' ')[1];

    const decodedUserId = await verifyToken(token, secret);

    if (userId !== decodedUserId) {
      return res.status(403).json({
        ok: false,
        error: {
          message: 'The Token does not match the user ID'
        }
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        error: {
          message: 'User not found'
        }
      });
    }

    user.updatedAt = new Date();

    if (username) {
      user.username = username
    }
    if (bio) {
      user.bio = bio
    }
    if (avatar !== undefined) {
      user.avatar = avatar
    }

    await user.save();

    res.json({
      ok: true,
      msg: 'User data updated successfuly',
      user: {
        id: user.id,
        username: user.username,
        bio: user.bio,
        avatar: user.avatar,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    return res.status(403).json({
      ok: false,
      error: {
        message: error.message,
        token
      }
    });
  }

};

const loginUser = async (req, res = response, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      ok: false,
      error: {
        message: 'You are not registered'
      }
    });
  }

  const validPassword = await user.comparePassword(
    password,
    user.password
  );

  if (!validPassword) {
    return res.status(401).json({
      ok: false,
      error: {
        message: 'Wrong Credentials'
      }
    });
  }

  const token = generateToken(user._id);

  res.status(200).json({
    ok: true,
    message: "you are logged in",
    token,
    duration: "1 hour"
  });
}


const renewToken = (req, res = response) => {
  const { token } = req.body;

  res.json({
    ok: true,
    msg: 'renew',
    token: token
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
  updateUser
};