const { Router } = require('express');
const router = Router();

const {createProduct} = require('../controllers/productsController');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');


router.post(
  '/createProduct', 
  [
    check('productName', 'productName is mandatory').not().isEmpty(),
    check('description', 'description is mandatory').not().isEmpty(),
    check('url', 'url is mandatory').not().isEmpty(),
    check('tags', 'tags is mandatory').not().isEmpty(),
    validateFields
  ],
  createProduct
);

module.exports = router;