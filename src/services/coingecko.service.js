const axios = require('axios');


class CoinGeckoService {
    constructor() {
        this.baseUrl = 'https://api.coingecko.com/api/v3';
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: 5000,
            headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }
        });
    }

    async getCoinData(coinId) {
        try {
            const response = await this.client.get('/simple/price', {
                params: {
                    ids: coinId,
                    vs_currencies: 'usd',
                    include_market_cap: true,
                    include_24hr_change: true
                }
            });

            const data = response.data[coinId];
            return {
                price: data.usd,
                marketCap: data.usd_market_cap,
                change24h: data.usd_24h_change
            };
        } catch (error) {
            console.log(`CoinGecko API error for ${coinId}:`, error);
            throw error;
        }
    }
}

module.exports = new CoinGeckoService();
