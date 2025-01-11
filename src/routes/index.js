const express = require('express');
const router = express.Router();
const cryptoRoutes = require('./crypto.routes');

router.use('/', cryptoRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = router;