const { response } = require('express');
const User = require('../models/User');
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

  const token = jwt.sign({
    id: user._id
  }, secret, { expiresIn: '1h' });

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
  renewToken
};