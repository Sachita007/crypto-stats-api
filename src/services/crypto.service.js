const CryptoPrice = require('../models/CryptoPrice.model');


class CryptoService {
    async getLatestStats(coinId) {
        try {
            console.log('Fetching stats for', coinId);
            const stats = await CryptoPrice.findOne({ coinId })
                .sort({ createdAt: -1 })
                .lean();

            return stats ? {
                price: stats.price,
                marketCap: stats.marketCap,
                "24hChange": stats.change24h
            } : null;
        } catch (error) {
            console.log('Error fetching stats:', error);
            throw error;
        }
    }

    async calculateDeviation(coinId) {
        try {
            const prices = await CryptoPrice.find({ coinId })
                .sort({ createdAt: -1 })
                .limit(100)
                .select('priceUsd -_id')
                .lean();

            if (prices.length === 0) return null;

            const values = prices.map(p => p.priceUsd);
            const mean = values.reduce((a, b) => a + b) / values.length;
            const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;

            return Math.sqrt(variance);
        } catch (error) {
            console.log('Error calculating deviation:', error);
            throw error;
        }
    }
}

module.exports = new CryptoService();