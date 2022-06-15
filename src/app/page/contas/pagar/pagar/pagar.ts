export class Pagar {

    id: number;
    descricao: string;
    observacao: string;
    valor: any;
    situacao: string;
    vencimento: string;

    constructor(id: number, descricao: string, observacao: string, valor: any,
        situacao: string, vencimento: string) {
        this.id = id;
        this.descricao = descricao;
        this.observacao = observacao;
        this.valor = valor;
        this.situacao = situacao;
        this.vencimento = vencimento;
    }

}