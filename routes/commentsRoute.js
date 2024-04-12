const { Router } = require('express');
const router = Router();

const {createComment, searchCommentsByIdProduct} = require('../controllers/commentsController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');


router.post(
  '/createComment/:id', 
  [
    check('content', 'content is mandatory').not().isEmpty(),
    check('rate', 'rate is mandatory').isNumeric().isIn([1,2,3,4,5]),
    validateFields
  ],
  createComment
);

router.get(
  '/searchComments/:id', 
  searchCommentsByIdProduct
);

module.exports = router;