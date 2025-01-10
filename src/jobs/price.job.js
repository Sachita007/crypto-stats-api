const cron = require('node-cron');
const { app: { cronSchedule, supportedCoins } } = require('../config');
const CoinGeckoService = require('../services/coingecko.service');
const CryptoPrice = require('../models/CryptoPrice.model');


class PriceUpdateJob {
    constructor() {
        this.job = null;
    }

    async updatePrices() {
        try {
            console.log('Starting price update job');

            const updates = await Promise.allSettled(
                supportedCoins.map(async (coinId) => {
                    try {
                        const data = await CoinGeckoService.getCoinData(coinId);
                        await CryptoPrice.create({
                            coinId,
                            price: data.price,
                            marketCap: data.marketCap,
                            change24h: data.change24h
                        });
                        console.log(`Updated prices for ${coinId}`);
                    } catch (error) {
                        console.log(`Failed to update ${coinId}:`, error);
                        throw error;
                    }
                })
            );

            const failures = updates.filter(result => result.status === 'rejected');
            if (failures.length > 0) {
                console.log(`Failed to update ${failures.length} coins`);
            }

            console.log('Price update job completed');
        } catch (error) {
            console.log('Price update job failed:', error);
        }
    }

    start() {
        if (this.job) {
            console.log('Price update job already running');
            return;
        }

        this.job = cron.schedule(cronSchedule, () => {
            this.updatePrices();
        });

        console.log('Price update job scheduled');

        // Run immediately on startup
        this.updatePrices();
    }

    stop() {
        if (this.job) {
            this.job.stop();
            this.job = null;
            console.log('Price update job stopped');
        }
    }
}

module.exports = new PriceUpdateJob();