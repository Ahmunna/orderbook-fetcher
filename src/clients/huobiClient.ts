import axios from 'axios';
import { ExchangeBaseClient } from './exchangeBaseClient'

// TODO: Implement Timeout and Retry Mechanisms
export class HuobiClient implements ExchangeBaseClient {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  //TODO: Control the return type and not the non primitve object type
  async orderbook(pair: string, depth: number = 10): Promise<object> {
    const endpoint: string = `${this.url}/market/depth`

    const params: object = {
      symbol: pair,
      depth: depth.toString(),
      type: 'step0'
    }

    try {
      const response = await axios.get(endpoint, { params });
      return response.data;
    }
    catch(err) {
      throw new Error('Failed to fetch order book')
    }
  }
}
