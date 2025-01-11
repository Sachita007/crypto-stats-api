const CryptoService = require('../services/crypto.service');
const AppError = require('../utils/AppError');


class CryptoController {
    async getStats(req, res, next) {
        try {
            const { coin } = req.query;
            const stats = await CryptoService.getLatestStats(coin);

            if (!stats) {
                throw new AppError('No data found for the specified coin', 404);
            }

            res.status(200).json(stats);
        } catch (error) {
            console.log('Stats controller error:', error);
            next(error);
        }
    }

    async getDeviation(req, res, next) {
        try {
            const { coin } = req.query;
            const deviation = await CryptoService.calculateDeviation(coin);

            if (deviation === null) {
                throw new AppError('Insufficient data for deviation calculation', 404);
            }

            res.status(200).json({
                deviation: Number(deviation.toFixed(2))
            });
        } catch (error) {
            console.log('Deviation controller error:', error);
            next(error);
        }
    }
}

module.exports = new CryptoController();
