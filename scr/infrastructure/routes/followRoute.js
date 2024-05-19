const { Router } = require('express');
const router = Router();

const { createFollow, deleteFollow, getFollowers, getFollowings} = require('../controllers/followController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');

router.post(
  '/follow',
  [
    check('followedUserId', 'followedUserId is mandatory').not().isEmpty(),
    validateFields
  ],
  createFollow
);

router.delete(
    '/unfollow',
    [
      check('followedUserId', 'followedUserId is mandatory').not().isEmpty(),
      validateFields
    ],
    deleteFollow
  );

  router.get(
    '/followers/:id',
    getFollowers
  );

  router.get(
    '/followings/:id',
    getFollowings
  );


module.exports = router;