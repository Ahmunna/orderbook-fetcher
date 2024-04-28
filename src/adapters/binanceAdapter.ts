import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { BinanceClient } from '../clients/binanceClient';
import { Orderbook } from '../models/orderbook';

export class BinanceAdapter implements ExchangeBaseAdapter {

  async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
    return await this.client().orderbook(this.to_pair(base_asset, quote_asset));
  }

  client(): BinanceClient {
    return new BinanceClient(process.env.BINANCE_API_BASE_URL || '')
  }

  to_pair(base_asset: string, quote_asset: string): string {
    return `${base_asset}${quote_asset}`
  }
}
