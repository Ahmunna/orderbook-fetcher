import express from 'express';
const router = express.Router()
const { getMarketPrice } = require('../controllers/tickersController')

router.get('/marketprice', getMarketPrice)

module.exports = router