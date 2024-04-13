const { Router } = require('express');
const router = Router();

const { createUser, loginUser, updateUser } = require('../controllers/usersController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

router.post(
  '/signUp', 
  [
    check('username', 'Username is mandatory').not().isEmpty(),
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password min length is 6').isLength({ min: 6 }),
    check('bio', 'Bio is mandatory').not().isEmpty(),
    validateFields
  ],
  createUser
);

router.post(
  '/logIn', 
  [
    check('email', 'Email is mandatory').isEmail(),
    check('password', 'Password is mandatory').not().isEmpty(),
    validateFields
  ],
  loginUser
);

router.put(
  '/updateUser/:id',
  [
    check('username', 'Username is mandatory').not().isEmpty(),
    check('bio', 'Bio is mandatory').not().isEmpty(),
    check('avatar').optional(),
    validateFields
  ],
  updateUser
);


module.exports = router;