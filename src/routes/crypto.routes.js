const express = require('express');
const router = express.Router();
const CryptoController = require('../controllers/crypto.controller');
const { validateCoin } = require('../middleware/validate.middleware');

router.get('/stats',
    validateCoin,
    CryptoController.getStats
);

router.get('/deviation',
    validateCoin,
    CryptoController.getDeviation
);

module.exports = router;