import { ExchangeBaseClient } from './exchangeBaseClient'
import axios from 'axios'
export class KrakenClient implements ExchangeBaseClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async orderbook(pair: string, depth: number = 10): Promise<object> {
    const endpoint: string = `${this.url}/Depth`

    const params: object = { pair: pair, depth: depth }

    try {
      const response = await axios.get(endpoint, { params });

      return response.data.result[pair]
    }
    catch(err) {
      throw new Error("Failed to fetch order book")
    }

  }
}
