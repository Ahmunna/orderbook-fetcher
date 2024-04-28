import axios from 'axios';
import { HuobiClient } from './huobiClient';

jest.mock('axios');

describe('HuobiClient', () => {
    let client: HuobiClient;
    const baseUrl = 'https://example.com';

    beforeEach(() => {
        client = new HuobiClient(baseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('orderbook', () => {
        it('should fetch order book correctly', async () => {
            const pair = 'btcusdt';
            const depth = 10;
            const mockData = {
                "ch": "market.btcusdt.depth.step0",
                "status": "ok",
                "ts": 1714337163167,
                "tick": {
                    "bids": [
                        [63649.54, 1.474976],
                        [63649.53, 3.18E-4]
                    ],
                    "asks": [
                        [63649.55, 0.003455],
                        [63656.14, 0.004537]
                    ]
                }
            };
            const mockResponse = { data: mockData };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await client.orderbook(pair, depth);

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/market/depth`, {
                params: { symbol: pair, depth: depth.toString(), type: 'step0' }
            });
        });

        it('should throw an error if fetching order book fails', async () => {
            const errorMessage = 'Failed to fetch order book';
            (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(client.orderbook('btcusdt', 10)).rejects.toThrow(errorMessage);
        });
    });
});
