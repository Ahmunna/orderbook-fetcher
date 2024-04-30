import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { KrakenClient } from '../clients/krakenClient';
import { Orderbook } from '../models/orderbook';
import { OrderbookEntry } from '../models/orderbookEntry';

export class KrakenAdapter implements ExchangeBaseAdapter {

  private krakenClient: KrakenClient;

  constructor() {
    this.krakenClient = new KrakenClient(process.env.KRAKEN_API_BASE_URL || '');
  }

  async orderbook(baseAsset: string, quoteAsset: string): Promise<Orderbook> {

    const result: any = await this.krakenClient.orderbook(this.to_pair(baseAsset, quoteAsset));
    return this.buildOrderbook(result);
  }

  private to_pair(baseAsset: string, quoteAsset: string): string {
    return `${baseAsset.toUpperCase()}${quoteAsset.toUpperCase()}`
  }

  private buildOrderbook(result: any): Orderbook {
    const bids: OrderbookEntry[] = result.bids.map((bid: any) => {
      return new OrderbookEntry(parseFloat(bid[1]), parseFloat(bid[0]));
    });

    const asks: OrderbookEntry[] = result.asks.map((ask: any) => {
      return new OrderbookEntry(parseFloat(ask[1]), parseFloat(ask[0]));
    });

    return new Orderbook(bids, asks);
  }
}
