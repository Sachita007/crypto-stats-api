const dbConfig = {
    uri: process.env.MONGODB_URI || 'mongodb://root:password@localhost:27017/crypto-tracker',
};

module.exports = dbConfig;