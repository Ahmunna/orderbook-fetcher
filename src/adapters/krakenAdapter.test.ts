import { KrakenAdapter } from './krakenAdapter';
import { KrakenClient } from '../clients/krakenClient';
import { Orderbook } from '../models/orderbook';
import { OrderbookEntry } from '../models/orderbookEntry';

jest.mock('../clients/krakenClient');

describe('KrakenAdapter', () => {
    let adapter: KrakenAdapter;

    beforeEach(() => {
        adapter = new KrakenAdapter();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('orderbook', () => {
        it('should fetch and build order book correctly', async () => {
            const mockOrderbookData = {
                bids: [
                    ["30000.00", "1.5"],
                    ["29950.00", "2.0"]
                ],
                asks: [
                    ["30100.00", "2.5"],
                    ["30150.00", "3.0"]
                ]
            };

            const expectedOrderbook = new Orderbook(
                [
                    new OrderbookEntry(1.5, 30000.00),
                    new OrderbookEntry(2.0, 29950.00)
                ],
                [
                    new OrderbookEntry(2.5, 30100.00),
                    new OrderbookEntry(3.0, 30150.00)
                ]
            );

            (KrakenClient.prototype.orderbook as jest.Mock).mockResolvedValue(mockOrderbookData);

            const result = await adapter.orderbook('BTC', 'USD');

            expect(result).toEqual(expectedOrderbook);
            expect(KrakenClient.prototype.orderbook).toHaveBeenCalledWith('BTCUSD');
        });

        it('should throw an error if fetching order book fails', async () => {
            const errorMessage = 'Failed to fetch order book';
            (KrakenClient.prototype.orderbook as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(adapter.orderbook('BTC', 'USD')).rejects.toThrow(errorMessage);
        });
    });
});
