import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { HuobiClient } from '../clients/huobiClient';
import { Orderbook } from '../models/orderbook';

export class HuobiAdapter implements ExchangeBaseAdapter {

    async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
        return await this.client().orderbook(this.to_pair(base_asset, quote_asset));
      }
    

  client(): HuobiClient {
    return new HuobiClient(process.env.HUOBI_API_BASE_URL || '')
  }

  to_pair(base_asset: string, quote_asset: string): string {
    return `${base_asset}${quote_asset}`
  }
}
