const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validationMiddleware = require('../middlewares/validationMiddleware');
const { protect } = require('../middlewares/authMiddleware')
const {  adminValidator } = require('../middlewares/adminValidator')


router.get('/getAllProducts', protect, adminValidator, productController.getAllProducts);
router.get('/', protect , productController.getProducts);
router.post('/create', protect, productController.createProduct);
router.put('/update/:id', protect, validationMiddleware.updateProduct, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);
module.exports = router;

