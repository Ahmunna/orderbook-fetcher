export class Orderbook {
    bids: number[];
    asks: number[];

    constructor(bids: number[], asks: number[]) {
        this.bids = bids
        this.asks = asks
    }
}
  