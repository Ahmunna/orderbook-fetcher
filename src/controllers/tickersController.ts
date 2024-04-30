import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';
import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: 'cache'
});

redis.on('connect', () => {
  console.log('Redis client is connected');
});

  // TODO: Handle errors better
  export const getMarketPrice = ( async (req: Request, res: Response)  => {

    const key = `${req.query.baseAsset}${req.query.quoteAsset}`

    const data: string  = await redis.get(key) || '';
    try
    {
      if(data) {
        res.json({ result: parseFloat(data)})
      }
      else {
        const marketPriceSerice = new MarketPriceService();
        const baseAsset: string = req.query.baseAsset as string;
        const quoteAsset: string = req.query.quoteAsset as string;
        const price = await marketPriceSerice.getPrice(baseAsset, quoteAsset);
        redis.setex(key, 30, price)
        res.json({ result: price })
      }
    }
    catch(error: any)
    {
      res.json({ error: error.message})
    }
  })



module.exports = { getMarketPrice }