const { Router } = require('express');
const router = Router();

const {createComment} = require('../controllers/commentsController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');


router.post(
  '/createComment/:id', 
  [
    check('content', 'content is mandatory').not().isEmpty(),
    validateFields
  ],
  createComment
);

module.exports = router;