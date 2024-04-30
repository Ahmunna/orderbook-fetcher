export interface ExchangeBaseClient {
    orderbook(pair: string): Promise<object>;
}
  