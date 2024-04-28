import { ExchangeBaseAdapter } from '../adapters/exchangeBaseAdapter';
import { HuobiClient } from '../clients/huobiClient';
import { Orderbook } from '../models/orderbook';
import { OrderbookEntry } from '../models/orderbookEntry';

export class HuobiAdapter implements ExchangeBaseAdapter {

    async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
      const result: any = await this.client().orderbook(this.to_pair(base_asset, quote_asset));
      return this.buildOrderbook(result);
    }
    

  private client(): HuobiClient {
    return new HuobiClient(process.env.HUOBI_API_BASE_URL || '')
  }

  private to_pair(base_asset: string, quote_asset: string): string {
    return `${base_asset}${quote_asset}`
  }

  private buildOrderbook(result: any): Orderbook {
    const bids: OrderbookEntry[] = result.tick.bids.map((bid: any) => {
        return new OrderbookEntry(parseFloat(bid[1]), parseFloat(bid[0]));
    });

    const asks: OrderbookEntry[] = result.tick.asks.map((ask: any) => {
        return new OrderbookEntry(parseFloat(ask[1]), parseFloat(ask[0]));
    });

    return new Orderbook(bids, asks);
}
}
