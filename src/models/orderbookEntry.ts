export class OrderbookEntry {
    volume: number;
    price: number;

    constructor(volume: number, price: number) {
        this.volume = volume;
        this.price = price;
    }
}