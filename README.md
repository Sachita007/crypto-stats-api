# Crypto Price Tracker

A Node.js application that tracks cryptocurrency prices using the CoinGecko API. The application fetches and stores price data for Bitcoin, Matic, and Ethereum every 2 hours and provides APIs to access this data.

## Live API

The application is deployed and accessible at:
```
http://ec2-13-201-18-201.ap-south-1.compute.amazonaws.com:3000
```

## Supported Cryptocurrencies

Currently, the application supports three cryptocurrencies:
- Bitcoin (coin=bitcoin)
- Matic Network (coin=matic-network)
- Ethereum (coin=ethereum)

## API Documentation

### Get Latest Stats
Fetches the latest price statistics for a specified cryptocurrency.

```
GET /stats
```

Query Parameters:
- `coin` (required): The cryptocurrency identifier (bitcoin, matic-network, or ethereum)

Example Request:
```
GET /stats?coin=bitcoin
```

Example Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### Get Price Deviation
Calculates the standard deviation of prices for the last 100 records.

```
GET /deviation
```

Query Parameters:
- `coin` (required): The cryptocurrency identifier (bitcoin, matic-network, or ethereum)

Example Request:
```
GET /deviation?coin=bitcoin
```

Example Response:
```json
{
    "deviation": 4082.48
}
```

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/Sachita007/crypto-stats-api.git
cd crypto-stats-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
touch .env
```

4. Configure environment variables in `.env`:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crypto-tracker
COIN_GECKO_API=Coin-gecko-api-key
```

5. Start MongoDB service (if running locally)

6. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
crypto-tracker/
├── src/
│   ├── config/         # Configuration files
│   ├── models/         # Database models
│   ├── services/       # Business logic
│   ├── jobs/           # Scheduled jobs
│   ├── controllers/    # Route handlers
│   ├── routes/         # API routes
│   ├── utils/          # Utilities
│   └── app.js         # Application entry point
```

