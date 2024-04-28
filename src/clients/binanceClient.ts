import { Orderbook } from '../models/orderbook';
import { ExchangeBaseClient } from './exchangeBaseClient'

export class BinanceClient implements ExchangeBaseClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async orderbook(pair: string): Promise<Orderbook> {
    // Implementation to fetch orderbook from Kraken API
    // Example:
    // const response = await fetch(`${this.url}/orderbook/${pair}`);
    // return response.json();
    return Promise.resolve({
      bids: [7000, 7010, 7020],
      asks: [7050, 7060, 7070],
    });
  }
}
