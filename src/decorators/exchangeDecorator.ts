import { KrakenAdapter } from "../adapters/krakenAdapter";
import { HuobiAdapter } from "../adapters/huobiAdapter";
import { BinanceAdapter } from "../adapters/binanceAdapter";
import { ExchangeBaseAdapter } from "../adapters/exchangeBaseAdapter";
import { Exchange } from "../models/exchange";
import { Orderbook } from "../models/orderbook";

export class ExchangeDecorator {

  exchange: Exchange;
  adapter: ExchangeBaseAdapter;

  constructor(exchange: Exchange) {
    this.exchange = exchange;
    this.adapter = this.createAdapter();
  }

  private createAdapter(): ExchangeBaseAdapter {
    switch (this.exchange.code) {
      case 'kraken':
        return new KrakenAdapter();
      case 'huobi':
        return new HuobiAdapter();
      case 'binance':
        return new BinanceAdapter();
      default:
        throw new Error(`Unsupported exchange code: ${this.exchange.code}`);
    }
  }

  async orderbook(baseAsset: string, quoteAsset: string): Promise<Orderbook> {
    return await this.adapter.orderbook(baseAsset, quoteAsset);
  }
}
