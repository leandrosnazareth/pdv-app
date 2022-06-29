export class ProductSold {

    id: any;
    product: any;
    price: any;
    priceTotal: any;
    quantity: number;

    constructor(id: any, product: any, price: any, priceTotal: any, quantity: number) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.priceTotal = priceTotal;
        this.quantity = quantity;
    }
}