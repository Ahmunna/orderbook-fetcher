import { ExchangeBaseClient } from './exchangeBaseClient'
import axios from 'axios'
export class BinanceClient implements ExchangeBaseClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async orderbook(pair: string, limit: number = 10): Promise<object> {
    const endpoint: string = `${this.url}/api/v3/depth`
    const params: object = {
      symbol: pair,
      limit: limit.toString()
    }

    try {
      const response = await axios.get(endpoint, { params });

      return response.data
    }
    catch(err) {
      throw new Error('Failed to fetch order book');
    }
  }
}
