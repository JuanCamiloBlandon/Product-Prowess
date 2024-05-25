const { response } = require('express');
const usersModel = require('../models/usersModel');
const userService = require('../../application/services/userService');
const { generateToken, verifyToken } = require('./tokenController');
const secret = process.env.SECRET;

const createUser = async (req, res = response) => {
  const { username, email, password, bio, avatar } = req.body
  console.log('Datos recibidos:', req.body);
  try {
    let user = await usersModel.findOne({ email });

    if (user) {
      return res.status(409).json({
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

    const userData = {username, email, password, bio, avatarUrl};
    const newUser = await userService.createUsers(userData);

    res.status(200).json({
      ok: true,
      msg: 'registered',
      user: {
        id: newUser.id, username: newUser.username, email: newUser.email, bio: newUser.bio,
        avatar: newUser.avatar, createdAt: newUser.createdAt, updatedAt: newUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
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
  const { username, bio, avatar } = req.body;
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
          return res.status(404).json({
              ok: false,
              error: {
                  message: 'User not found'
              }
          });
      }

      const userData = { username, bio, avatar };
      const updatedUser = await userService.updateUsers(userId,userData);

      res.status(200).json({
          ok: true,
          msg: 'User data updated successfully',
      });
  } catch (error) {
      if (error.message === 'Invalid Token') {
          return res.status(401).json({
              ok: false,
              error: {
                  message: 'Invalid Token'
              }
          });
      }
      res.status(500).json({
          ok: false,
          error: {
              message: 'Something went wrong, please contact the admin'
          }
      });
  }
};


const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
      const user = await userService.loginUsers(email, password);

      const token = generateToken(user._id);

      res.status(200).json({
          ok: true,
          message: "You are logged in",
          token,
          duration: "1 hour"
      });

  } catch (error) {
      if (error.message === 'Error: You are not registered') {
          return res.status(404).json({
              ok: false,
              error: {
                  message: 'You are not registered'
              }
          });
      }

      if (error.message === 'Error: Wrong Credentials') {
          return res.status(401).json({
              ok: false,
              error: {
                  message: 'Wrong Credentials'
              }
          });
      }

      res.status(500).json({
          ok: false,
          error: {
              message: 'Something went wrong, please contact the admin'
          }
      });
  }
};


module.exports = {
  createUser,
  loginUser,
  updateUser
};