import { Orderbook } from "../models/orderbook";

export interface ExchangeBaseClient {
    orderbook(pair: string): Promise<object>;
}
  