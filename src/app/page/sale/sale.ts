export class Sale {

    id: any;
    amount: any;
    amountPaid: any;
    difference: any;
    payment: any;
    productSolds: any;

    constructor(id: any, amount: any, amountPaid: any, difference: any,
        payment: any, productSolds: any) {
        this.id = id;
        this.amount = amount;
        this.amountPaid = amountPaid;
        this.difference = difference;
        this.payment = payment;
        this.productSolds = productSolds;
    }
}