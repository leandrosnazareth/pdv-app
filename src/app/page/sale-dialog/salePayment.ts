export class SalePayment {

    pagar: any;
    pago: any;
    troco: any;
    pagamento: string;

    constructor(pagar: any, pago: any, troco: any, pagamento: string) {
        this.pagar = pagar;
        this.pago = pago;
        this.troco = troco;
        this.pagamento = pagamento;
    }
}