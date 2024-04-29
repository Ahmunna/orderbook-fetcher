import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
  });

redisClient.on('connect', () => {
  console.log('Redis client is connected');
});

  // TODO: Handle errors better
  const getMarketPrice = ( async (req: Request, res: Response)  => {

    const key = `${req.query.baseAsset}${req.query.quoteAsset}`

    redisClient.get(key, async (err: Error, data: string) => {
      try
      {
        if(data) {
          res.json({ result: parseFloat(data)})
        }
        else {
          const marketPriceSerice = new MarketPriceService();
          const price = await marketPriceSerice.getPrice(req.params.baseAsset, req.params.quoteAsset);
          redisClient.setex(key, 30, price)
          res.json({ result: price })
        }
      }
      catch(error: any)
      {
        res.sendStatus(500);
      }
       
    })
  })



module.exports = { getMarketPrice }