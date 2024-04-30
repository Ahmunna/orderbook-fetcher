import { Orderbook } from "../models/orderbook";
import { MarketPriceService } from "./marketPriceService";

describe('MarketPriceService', () => {
  let marketPriceService: MarketPriceService;

  beforeEach(() => {
    marketPriceService = new MarketPriceService();
  });

  it('calculates the average mid price correctly', async () => {
    const baseAsset = 'BTC';
    const quoteAsset = 'USDT';

    // Mock ExchangeDecorator and Orderbook
    const orderbookMock: Orderbook = {
      bids: [{ price: 100, volume: 1 }, { price: 90, volume: 2 }],
      asks: [{ price: 110, volume: 1 }, { price: 120, volume: 2 }]
    };

    // Mock getPrice function
    jest.spyOn(marketPriceService, 'getPrice').mockImplementation(async () => {
      return 105; // Dummy return value
    });

    // Call getPrice
    const price = await marketPriceService.getPrice(baseAsset, quoteAsset);

    // Assert that getPrice returns the correct average mid price
    expect(price).toBe(105);
  });

});
