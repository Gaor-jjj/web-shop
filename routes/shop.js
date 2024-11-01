const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')

router.get('/cart', (req, res) => shopController.getCart(req, res))
router.post('/cart', (req, res) => shopController.addToCart(req, res))
router.post('/cart/delete', (req, res) => shopController.removeFromCart(req, res))

module.exports = router