const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.get('/', productController.getAllProducts);

router.post('/create', validationMiddleware.validateProduct, productController.createProduct);

router.put('/:id', validationMiddleware.validateProduct, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;