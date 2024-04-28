import { MarketPriceService } from '../services/marketPriceService';

export class TickerController {

  async getPrice(baseAsset: string, quoteAsset: string): Promise<number> {
    const marketPriceSerice = new MarketPriceService();
    return await marketPriceSerice.getPrice(baseAsset, quoteAsset);
  }
}
