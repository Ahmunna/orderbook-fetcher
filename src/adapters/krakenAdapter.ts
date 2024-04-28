import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { KrakenClient } from '../clients/krakenClient';
import { Orderbook } from '../models/orderbook';
import { OrderbookEntry } from '../models/orderbookEntry';

export class KrakenAdapter implements ExchangeBaseAdapter {

    async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
        const result: any = await this.client().orderbook(this.to_pair(base_asset, quote_asset));
        return this.buildOrderbook(result);
      }
    

  client(): KrakenClient {
    return new KrakenClient(process.env.KRAKEN_API_BASE_URL || '')
  }

  to_pair(base_asset: string, quote_asset: string): string {
    return `${base_asset}${quote_asset}`
  }

  buildOrderbook(result: any): Orderbook {
    const bids: OrderbookEntry[] = result.bids.map((bid: any) => {
        return new OrderbookEntry(parseFloat(bid[1]), parseFloat(bid[0]));
    });

    const asks: OrderbookEntry[] = result.asks.map((ask: any) => {
        return new OrderbookEntry(parseFloat(ask[1]), parseFloat(ask[0]));
    });

    return new Orderbook(bids, asks);
}
}
