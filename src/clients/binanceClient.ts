import { ExchangeBaseClient } from './exchangeBaseClient'
import axios from 'axios'
export class BinanceClient implements ExchangeBaseClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  //TODO: Control the return type and not the non primitve object type
  async orderbook(pair: string, limit: number = 10): Promise<object> {
    const endpoint: string = `${this.url}/depth`
    const params: object = {
      symbol: pair,
      limit: limit.toString()
    }

    try {
      const response = await axios.get(endpoint, { params });

      return response.data
    }
    catch(err: any) {
      throw new Error(`Failed to fetch order book: ${err.message}`);
    }
  }
}
