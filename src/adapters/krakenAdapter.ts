import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { KrakenClient } from '../clients/krakenClient';
import { Orderbook } from '../models/orderbook';

export class KrakenAdapter implements ExchangeBaseAdapter {

    async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
        return await this.client().orderbook(this.to_pair(base_asset, quote_asset));
      }
    

  client(): KrakenClient {
    return new KrakenClient(process.env.KRAKEN_API_BASE_URL || '')
  }

  to_pair(base_asset: string, quote_asset: string): string {
    return `${base_asset}${quote_asset}`
  }
}
