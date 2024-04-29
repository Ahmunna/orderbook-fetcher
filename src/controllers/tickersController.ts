import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';
const redis = require('redis');

const redisClient = redis.createClient();

  // TODO: Handle errors better
  const getMarketPrice = ( async (req: Request, res: Response)  => {
    const key = `${req.params.baseAsset}${req.params.quoteAsset}`

    redisClient.get(key, async (err: Error, data: string) => {
      try
      {
        if(data) {
          res.json({ result: parseFloat(data)})
        }
        else {
          const marketPriceSerice = new MarketPriceService();
          const price = await marketPriceSerice.getPrice(req.params.baseAsset, req.params.quoteAsset);
          redisClient.set(key, price, { EX: 30 })
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