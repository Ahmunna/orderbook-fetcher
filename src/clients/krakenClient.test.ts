import axios from 'axios';
import { KrakenClient } from './krakenClient';

jest.mock('axios');

describe('KrakenClient', () => {
    let client: KrakenClient;
    const baseUrl = 'https://example.com';

    beforeEach(() => {
        client = new KrakenClient(baseUrl);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('orderbook', () => {
        it('should fetch order book correctly', async () => {
            const pair = 'XBTUSD';
            const depth = 10;
            const mockData = {
                "asks": [
                    ["30000.0", "0.1"],
                    ["30100.0", "0.2"]
                ],
                "bids": [
                    ["29000.0", "0.3"],
                    ["29100.0", "0.4"]
                ]
            };
            const mockResponse = { data: { result: { [pair]: mockData } } };
            (axios.get as jest.Mock).mockResolvedValue(mockResponse);

            const result = await client.orderbook(pair, depth);

            expect(result).toEqual(mockData);
            expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/Depth`, {
                params: { pair, depth }
            });
        });

        it('should throw an error if fetching order book fails', async () => {
            const errorMessage = 'Failed to fetch order book';
            (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(client.orderbook('XBTUSD', 10)).rejects.toThrow(errorMessage);
        });
    });
});
