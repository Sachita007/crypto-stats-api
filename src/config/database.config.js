const dbConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto-tracker',
};

module.exports = dbConfig;