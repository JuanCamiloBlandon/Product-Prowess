const { Router } = require('express');
const router = Router();

const { createProduct, updateProduct, deleteProduct, searchProductById, searchProductsByTagOrName, searchRateAverageByProductId,getAllProducts} = require('../controllers/productsController');
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
);

router.delete(
  '/deleteProduct/:id',
  deleteProduct
);

router.get(
  '/searchProduct/:id',
  searchProductById
);

router.get(
  '/search',
  searchProductsByTagOrName
);

router.get(
  '/allProducts',
  getAllProducts
);

router.get(
  '/searchRateAverage/:id',
  searchRateAverageByProductId
);


module.exports = router;