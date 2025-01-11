const { app: supportedCoins } = require('./config');

const validateCoin = (req, res, next) => {
    const { coin } = req.query;
    if (!coin || !supportedCoins.includes(coin)) {
        return res.status(400).json({
            error: 'Invalid coin. Supported coins: ' + config.coinGecko.supportedCoins.join(', '),
        });
    }
    next();
};