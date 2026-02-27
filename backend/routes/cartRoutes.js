const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, cartController.getCart);
router.post('/add/:id', ensureAuthenticated, cartController.addToCart);
router.post('/remove/:id', ensureAuthenticated, cartController.removeFromCart);

module.exports = router;
