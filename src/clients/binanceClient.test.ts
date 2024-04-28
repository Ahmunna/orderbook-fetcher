import axios from 'axios';
import { BinanceClient } from './binanceClient';

jest.mock('axios');

describe('BinanceClient', () => {
    let client: BinanceClient;
    const baseUrl = 'https://example.com';

    beforeEach(() => {
        client = new BinanceClient(baseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('orderbook', () => {
        it('should fetch order book correctly', async () => {
            const mockData = {
                "lastUpdateId": 1027024,
                "bids": [
                  [
                    "4.00000000",     // PRICE
                    "431.00000000"    // QTY
                  ]
                ],
                "asks": [
                  [
                    "4.00000200",
                    "12.00000000"
                  ]
                ]
              };
            const mockResponse = { data: mockData };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await client.orderbook('BTCUSDT', 10);

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/api/v3/depth`, {
                params: {
                    symbol: 'BTCUSDT',
                    limit: '10'
                }
            });
        });

        it('should throw an error if fetching order book fails', async () => {
            const errorMessage = 'Failed to fetch order book';
            (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(client.orderbook('BTCUSDT', 10)).rejects.toThrow(errorMessage);
        });
    });
});
