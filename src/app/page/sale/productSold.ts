export class ProductSold {

    id: number;
    product: any;
    price: any;
    quantity: number;

    constructor(id: number, product: any, price: any, quantity: number) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
    }
}