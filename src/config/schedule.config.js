const scheduleConfig = {
    priceUpdate: {
        // Runs every 2 hours
        schedule: '0 */2 * * *',
        options: {
            timezone: 'UTC',
            // Whether to run job on startup
            runOnInit: true
        }
    }
};

module.exports = scheduleConfig;