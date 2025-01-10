const dbConfig = require('./database.config');
const appConfig = require('./app.config');

module.exports = {
    app: appConfig,
    db: dbConfig,
};