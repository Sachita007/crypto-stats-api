
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { app: appConfig, db: dbConfig } = require('./config');
const priceJob = require('./jobs/price.job');
const errorHandler = require('./utils/errorHandler');




const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/', async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is up and running'
    });
});



// Error handling
app.use(errorHandler);


// Database connection
mongoose
    .connect(dbConfig.uri)
    .then(() => {
        console.log('MongoDB connected');

        // Start the server
        const server = app.listen(appConfig.port, () => {
            console.log(`Server running on port ${appConfig.port}`);

            // Start the price update job
            priceJob.start();



            // Graceful shutdown
            process.on('SIGTERM', () => {
                server.close(() => {
                    priceJob.stop();
                    mongoose.connection.close(false, () => {
                        process.exit(0);
                    });
                });
            });
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    process.exit(1);
});

module.exports = app;