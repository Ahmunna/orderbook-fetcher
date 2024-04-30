import { OrderbookEntry } from "./orderbookEntry";
export class Orderbook {
    bids: OrderbookEntry[];
    asks: OrderbookEntry[];

    constructor(bids: OrderbookEntry[], asks: OrderbookEntry[]) {
        this.bids = bids
        this.asks = asks
    }

    toString(): string {
        const bidsStr = this.bids.map(bid => `[Price: ${bid.price}, volume: ${bid.volume}]`).join(', ');
        const asksStr = this.asks.map(ask => `[Price: ${ask.price}, volume: ${ask.volume}]`).join(', ');
        return `Bids: [${bidsStr}], Asks: [${asksStr}]`;
      }
}
  