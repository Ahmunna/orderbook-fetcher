import { Orderbook } from "../models/orderbook";

export interface ExchangeBaseAdapter {
    orderbook(base_asset: string, quote_asset: string): Promise<Orderbook>;
  }