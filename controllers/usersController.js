const { response } = require('express');
const User = require('../models/User');

const jwt = require('jsonwebtoken');


const createUser = async (req, res = response) => {
  const { username, email, password, bio } = req.body

  const secret = 'oculto';

  const token = jwt.sign({
    username, email, password, username, bio
  }, secret, { expiresIn: '1h' });

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
    const avatar = "";
    const createdAt = new Date();
    const updatedAt = new Date();

    user = new User({ username, email, password, bio, avatar, createdAt, updatedAt });

    await user.save();

    res.json({
      ok: true,
      msg: 'registered',
      user: {
        id: user.id, username: user.username, email: user.email, bio: user.bio,
        avatar: user.avatar, createdAt: user.createdAt, updatedAt: user.updatedAt,
      },
      token
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

  let data = null;

  if (!user) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'Wrong Credentials'
      }
    });
  }

  const token = req.headers.authorization

  if (!token){
    return res.status(401).json({
      ok: false,
      error: {
        message: 'Missing Token'
      }
    })
  }

  jwt.verify(token, 'oculto', (error, decoded) => {
    console.log(token)
    if (error) {
      return res.status(403).json({
        ok: false,
        error: {
          message: 'Invalid Token'
        }
      })
    };
    data = decoded
    next();
  })


  try {
    res.status(200).json({
      ok: true,
      uid: user.id,
      email: user.email,
      data: data
    });

  } catch (error) {
    console.error('[ERROR]', error);

    res.status(500).json({
      ok: false,
      error: {
        message: 'Something went worng, please contact to admin'
      }
    });
  }
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