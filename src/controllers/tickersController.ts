import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';
const redis = require('redis');

const redisClient = redis.createClient();

  const getMarketPrice = ( async (req: Request, res: Response)  => {
    const key = `${req.params.baseAsset}${req.params.quoteAsset}`

    redisClient.get(key, async (err: Error, data: string) => {
        if(data) {
          res.json({ result: parseFloat(data)})
        }
        else {
          const marketPriceSerice = new MarketPriceService();
          const price = await marketPriceSerice.getPrice("BTC", "USDT");
          redisClient.set(key, price, { EX: 30 })
          res.json({ result: price })
        }
    })
  })



module.exports = { getMarketPrice }