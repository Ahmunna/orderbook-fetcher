import { ExchangeDecorator } from '../decorators/exchangeDecorator';
import { Exchange } from '../models/exchange';
import { Orderbook } from '../models/orderbook';

export class MarketPriceService {

  // TODO: Handle errors better
  async getPrice(baseAsset: string, quoteAsset: string): Promise<number> {
    // TODO: get exchanges from Database
    const exchanges: Exchange[] = [
        new Exchange('Kraken', 'kraken'),
        new Exchange('Binance', 'binance'),
        new Exchange('Huobi', 'huobi')
    ]
    
    const exchangeDecorators: ExchangeDecorator[] = exchanges.map( (exchange) => new ExchangeDecorator(exchange))
    
    const orderbooks: Orderbook[] = await Promise.all(exchangeDecorators.map((exchangeDecorator) => exchangeDecorator.orderbook(baseAsset, quoteAsset)));
    
    const midPrices: number[] = orderbooks.map(orderbook => this.calculateMidPrice(orderbook));

    const averageMidPrice: number = this.calculateAverage(midPrices);
    
    return averageMidPrice;
  }

  private calculateMidPrice(orderbook: Orderbook): number {
    const bestBid = Math.max(...orderbook.bids.map((entry) => entry.price));
    const bestAsk = Math.min(...orderbook.asks.map((entry) => entry.price));
    return (bestBid + bestAsk) / 2;
  }

  private calculateAverage(numbers: number[]): number {
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length || 0;
  }
}
