const express = require('express');
const router = express.Router();

const {paymentCheckout, paymentVerification, getKey} = require('../controllers/PaymentController')

router.route('/api/getkey').get(getKey)
router.route('/checkout').post(paymentCheckout)
router.route('/paymentverification').post(paymentVerification)

module.exports = router