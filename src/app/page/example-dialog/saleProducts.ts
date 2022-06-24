export class SaleProducts {

    valorTotal: any;
    formaPagamento: any;
    productSolds: any;

    constructor(valorTotal: string, formaPagamento: any, productSolds: any) {
        this.valorTotal = valorTotal;
        this.formaPagamento = formaPagamento;
        this.productSolds = productSolds;
    }
}