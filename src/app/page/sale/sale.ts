export class Sale {

    id: number;
    valorTotal: any;
    valorPago: any;
    troco: any;
    formaPagamento: any;
    productSolds: any;

    constructor(id: number, valorTotal: string, valorPago: any, troco: any,
        formaPagamento: any, productSolds: any) {
        this.id = id;
        this.valorTotal = valorTotal;
        this.valorPago = valorPago;
        this.troco = troco;
        this.formaPagamento = formaPagamento;
        this.productSolds = productSolds;
    }
}