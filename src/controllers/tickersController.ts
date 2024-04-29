import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

redis.on('connect', () => {
  console.log('Redis client is connected');
});

  // TODO: Handle errors better
  const getMarketPrice = ( async (req: Request, res: Response)  => {

    const key = `${req.query.baseAsset}${req.query.quoteAsset}`

    const data: string  = await redis.get(key) || '';
    try
    {
      if(data) {
        res.json({ result: parseFloat(data)})
      }
      else {
        const marketPriceSerice = new MarketPriceService();
        const price = await marketPriceSerice.getPrice(req.params.baseAsset, req.params.quoteAsset);
        redis.setex(key, 30, price)
        res.json({ result: price })
      }
    }
    catch(error: any)
    {
      res.sendStatus(500);
    }
  })



module.exports = { getMarketPrice }