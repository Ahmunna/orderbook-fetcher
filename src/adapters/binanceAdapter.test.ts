import { BinanceAdapter } from './binanceAdapter';
import { BinanceClient } from '../clients/binanceClient';
import { Orderbook } from '../models/orderbook';
import { OrderbookEntry } from '../models/orderbookEntry';

jest.mock('../clients/binanceClient');

describe('BinanceAdapter', () => {
    let adapter: BinanceAdapter;

    beforeEach(() => {
        adapter = new BinanceAdapter();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('orderbook', () => {
        it('should fetch and build order book correctly', async () => {
            const mockOrderbookData = {
                "asks": [
                    ["30000.00", "1.5"],
                    ["29950.00", "2.0"]
                ],
                "bids": [
                    ["30100.00", "2.5"],
                    ["30150.00", "3.0"]
                ]
            };

            const expectedOrderbook = new Orderbook(
                [
                    new OrderbookEntry(2.5, 30100.00),
                    new OrderbookEntry(3.0, 30150.00)
                ],
                [
                    new OrderbookEntry(1.5, 30000.00),
                    new OrderbookEntry(2.0, 29950.00)
                ]
            );

            (BinanceClient.prototype.orderbook as jest.Mock).mockResolvedValue(mockOrderbookData);

            const result = await adapter.orderbook('BTC', 'USD');

            expect(result).toEqual(expectedOrderbook);
            expect(BinanceClient.prototype.orderbook).toHaveBeenCalledWith('BTCUSD');
        });

        it('should throw an error if fetching order book fails', async () => {
            const errorMessage = 'Failed to fetch order book';
            (BinanceClient.prototype.orderbook as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(adapter.orderbook('BTC', 'USD')).rejects.toThrowError(errorMessage);
        });
    });
});
