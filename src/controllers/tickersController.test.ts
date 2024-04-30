import { getMarketPrice } from './tickersController';
import { Request, Response } from 'express';
import Redis from 'ioredis';
import { MarketPriceService } from '../services/marketPriceService';

jest.mock('ioredis');
jest.mock('../services/marketPriceService');

describe('getMarketPrice', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {
        baseAsset: 'BTC',
        quoteAsset: 'USD'
      }
    };
    res = {
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns market price from Redis if available', async () => {
    const redisGetMock = jest.fn().mockResolvedValue('100');
    (Redis as jest.Mocked<typeof Redis>).prototype.get = redisGetMock;

    await getMarketPrice(req as Request, res as Response);

    expect(redisGetMock).toHaveBeenCalledWith('BTCUSD');
    expect(res.json).toHaveBeenCalledWith({ result: 100 });
  });

  it('calls MarketPriceService if data is not available in Redis', async () => {
    const redisGetMock = jest.fn().mockResolvedValue('');
    (Redis as jest.Mocked<typeof Redis>).prototype.get = redisGetMock;

    const getPriceMock = jest.fn().mockResolvedValue(200);
    (MarketPriceService as jest.MockedClass<typeof MarketPriceService>).prototype.getPrice = getPriceMock;

    await getMarketPrice(req as Request, res as Response);

    expect(redisGetMock).toHaveBeenCalledWith('BTCUSD');
    expect(getPriceMock).toHaveBeenCalledWith('BTC', 'USD');
    expect(res.json).toHaveBeenCalledWith({ result: 200 });
  });

  it('returns error message if MarketPriceService throws an error', async () => {
    const redisGetMock = jest.fn().mockResolvedValue('');
    (Redis as jest.Mocked<typeof Redis>).prototype.get = redisGetMock;

    const errorMessage = 'Error fetching market price';
    const getPriceMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    (MarketPriceService as jest.MockedClass<typeof MarketPriceService>).prototype.getPrice = getPriceMock;

    await getMarketPrice(req as Request, res as Response);

    expect(redisGetMock).toHaveBeenCalledWith('BTCUSD');
    expect(getPriceMock).toHaveBeenCalledWith('BTC', 'USD');
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
