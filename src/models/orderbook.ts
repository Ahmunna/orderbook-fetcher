import { OrderbookEntry } from "./orderbookEntry";
export class Orderbook {
    bids: OrderbookEntry[];
    asks: OrderbookEntry[];

    constructor(bids: OrderbookEntry[], asks: OrderbookEntry[]) {
        this.bids = bids
        this.asks = asks
    }
}
  