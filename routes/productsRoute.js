const { Router } = require('express');
const router = Router();

const {createProduct, updateProduct} = require('../controllers/productsController');
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

router.put(
  '/updateProduct/:id',
  [
    check('productName', 'productName is mandatory').not().isEmpty(),
    check('description', 'description is mandatory').not().isEmpty(),
    validateFields
  ],
  updateProduct
)

module.exports = router;