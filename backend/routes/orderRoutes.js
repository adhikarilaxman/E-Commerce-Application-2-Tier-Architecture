const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { ensureAuthenticated } = require('../middleware/auth');

router.post('/checkout', ensureAuthenticated, orderController.checkout);
router.get('/', ensureAuthenticated, orderController.getOrderHistory);

module.exports = router;
