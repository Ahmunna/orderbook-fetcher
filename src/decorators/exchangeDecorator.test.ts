import { BinanceAdapter } from "../adapters/binanceAdapter";
import { HuobiAdapter } from "../adapters/huobiAdapter";
import { KrakenAdapter } from "../adapters/krakenAdapter";
import { Exchange } from "../models/exchange";
import { Orderbook } from "../models/orderbook";
import { ExchangeDecorator } from "./exchangeDecorator";

jest.mock('../adapters/krakenAdapter');
jest.mock('../adapters/huobiAdapter');
jest.mock('../adapters/binanceAdapter');

describe('ExchangeDecorator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates the correct adapter based on exchange code', () => {
    const krakenExchange = new Exchange('Kraken', 'kraken');
    const huobiExchange = new Exchange('Huobi', 'huobi');
    const binanceExchange = new Exchange('Binance', 'binance');

    const krakenDecorator = new ExchangeDecorator(krakenExchange);
    const huobiDecorator = new ExchangeDecorator(huobiExchange);
    const binanceDecorator = new ExchangeDecorator(binanceExchange);

    expect(krakenDecorator.adapter).toBeInstanceOf(KrakenAdapter);
    expect(huobiDecorator.adapter).toBeInstanceOf(HuobiAdapter);
    expect(binanceDecorator.adapter).toBeInstanceOf(BinanceAdapter);
  });

  it('calls the orderbook method of the adapter', async () => {
    const mockOrderbook: Orderbook = {
      bids: [],
      asks: []
    };

    // Mock the adapter's orderbook method
    KrakenAdapter.prototype.orderbook = jest.fn().mockResolvedValue(mockOrderbook);

    const krakenExchange = new Exchange('Kraken', 'kraken');
    const krakenDecorator = new ExchangeDecorator(krakenExchange);

    const result = await krakenDecorator.orderbook('BTC', 'USDT');

    expect(KrakenAdapter.prototype.orderbook).toHaveBeenCalledWith('BTC', 'USDT');
    expect(result).toEqual(mockOrderbook);
  });
});
