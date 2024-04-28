import { MarketPriceService } from '../services/marketPriceService';
import { Request, Response } from 'express';

  const getMarketPrice = ( async (req: Request, res: Response)  => {
    const marketPriceSerice = new MarketPriceService();
    const price = await marketPriceSerice.getPrice("BTC", "USDT");
    res.json({ result: price })
  })



module.exports = { getMarketPrice }