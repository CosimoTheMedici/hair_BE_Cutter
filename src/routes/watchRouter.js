const express = require('express');
const watchController = require('../controllers/watchController');

const router = express.Router();


router.post('/add/product', watchController.addProductToCart);
router.post('/like/product', watchController.likeProduct);
router.get('/get/products', watchController.getALLProducts);


module.exports = router;