import { KrakenAdapter } from "../adapters/krakenAdapter";
import { HuobiAdapter } from "../adapters/huobiAdapter";
import { BinanceAdapter } from "../adapters/binanceAdapter";
import { ExchangeBaseAdapter } from "../adapters/exchangeBaseAdapter";
import { Exchange } from "../models/exchange";
import { Orderbook } from "../models/orderbook";

export class ExchangeDecorator {

    exchange: Exchange;

    constructor(exchange: Exchange) {
        this.exchange = exchange
    }

  adapter(): ExchangeBaseAdapter {
    switch(this.exchange.code) {
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

  async orderbook(base_asset: string, quote_asset: string): Promise<Orderbook> {
    return await this.adapter().orderbook(base_asset, quote_asset);
  }
}