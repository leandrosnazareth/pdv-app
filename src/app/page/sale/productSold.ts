export class ProductSold {

    id: number;
    product: any;
    price: any;
    priceTotal: any;
    quantity: number;

    constructor(id: number, product: any, price: any, priceTotal: any, quantity: number) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.priceTotal = priceTotal;
        this.quantity = quantity;
    }
}