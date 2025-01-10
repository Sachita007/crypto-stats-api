// src/models/CryptoPrice.model.js
const mongoose = require('mongoose');

const cryptoPriceSchema = new mongoose.Schema({
    coinId: {
        type: String,
        required: true,
        enum: ['bitcoin', 'matic-network', 'ethereum'],
        index: true
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Index for faster queries on recent data
cryptoPriceSchema.index({ coinId: 1, createdAt: -1 });


module.exports = mongoose.model('CryptoPrice', cryptoPriceSchema);