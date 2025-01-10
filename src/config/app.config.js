const appConfig = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    supportedCoins: ['bitcoin', 'matic-network', 'ethereum'],
    cronSchedule: '0 */2 * * *' // Every 2 hours
};

module.exports = appConfig;