import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import parseMoney from 'parse-money';
import { PagarService } from 'src/app/service/contas/pagar.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Pagar } from './pagar';

@Component({
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.scss']
})
export class PagarComponent implements OnInit {

  formulario: FormGroup;
  //lista de pagares para exiboir
  pagares: Pagar[] = [];
  //ordem das colunas no html
  ordemColunasTabela = ['id', 'descricao', 'valor', 'vencimento', 'situacao', 'excluir', 'editar'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  //array de strings dos erros retornados do backend
  mensagemErros: String[] = [];
  
  constructor(
    private pagarService: PagarService,
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarPagares(this.pagina, this.tamanho);

  }

  submit() {
    //verifica se contem erros no formulário
    const erroNomeRequired = this.formulario.controls.descricao.errors;
    const erroEmailInvalido = this.formulario.controls.observacao.errors;

    //pegar os dados do formulário
    const formValues = this.formulario.value;

    // cria e adiciona no objeto
    const pagar: Pagar = new Pagar(formValues.id, formValues.descricao,
      formValues.observacao, parseMoney(formValues.valor)?.amount, formValues.situacao,
      formValues.vencimento.toLocaleDateString());

    if (formValues.id) {

      this.pagarService.update(pagar).subscribe(resposta => {
        this.listarPagares(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Pagar alterada com sucesso!', 'Sucesso', {
          duration: 2000
        })
      }, errorResponse => {
        // exibe mensagem de erro da api
        this.mensagemErros = ['Erro: ' + errorResponse.error.message];
      })
    } else {
      console.log('cadastrando');
      // cria e adiciona no objeto
      this.pagarService.save(pagar).subscribe(resposta => {
        // add o objeto a lista para listar ... é a lista antiga
        this.listarPagares(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Pagar salva com sucesso!', 'Sucesso', {
          duration: 2000
        })
      }, errorResponse => {
        // exibe mensagem de erro da api
        this.mensagemErros = ['Erro: ' + errorResponse.error.message];
      })
    }
    //limpar formulário
    this.formulario.reset();
  }

  montarFormulario() {
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, Validators.nullValidator],
      descricao: [null, Validators.required],
      observacao: [null, Validators.nullValidator],
      valor: [null, Validators.required],
      situacao: [null, Validators.required],
      vencimento: [null, Validators.required],
    })
  }

  limparFormulario() {
    this.formulario.reset();
  }

  //formata a data para inserir no componente
  formatarDataParaComponente(data: string) {
    return new Date(moment(data, "DD/MM/YYYY").format("YYYY-MM-DD") + 'T03:00:00.000Z');
  }

  listarPagares(pagina: number, tamanho: number) {// definir a primeira página e o tamanho inicial
    this.pagarService.list(pagina, tamanho).subscribe((response) => {
      this.pagares = response.content; // pegar o conteudo do pag
      this.totalElementos = response.totalElements;// pegar o total de elementos
      this.pagina = response.number;// pegar o numero de paginas
    });
  }

  private excluir(id: number) {
    this.pagarService.delete(id).subscribe((response) => {
      this.ngOnInit();
      this.mensagemErros = [];
      // exibir mensagem snackbar
      this.snackBar.open('Pagar excluida com sucesso!', 'Sucesso', {
        duration: 2000
      })
    }, errorResponse => {
      // exibe mensagem de erro da api
      this.mensagemErros = ['Erro: ' + errorResponse.error.message];
    })
  }


  editar(id: number) {
    this.pagarService.findPagarById(id).subscribe((response) => {
      const formValues = this.formulario.value;

      // cria e adiciona no objeto
      this.formulario.controls.id.setValue(id);
      this.formulario.controls.descricao.setValue(response.descricao);
      this.formulario.controls.observacao.setValue(response.observacao);
      this.formulario.controls.valor.setValue((response.valor.valorFormatado).replace("R$ "));
      this.formulario.controls.vencimento.setValue(this.formatarDataParaComponente(response.vencimento));
      this.formulario.controls.situacao.setValue(response.situacao);
    })
  }

  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;// setar a pagina que deseja ir
    this.tamanho = event.pageSize; // quantidade de linhas
    this.listarPagares(this.pagina, this.tamanho);// chama o listar contatos passando a pagina e o tamanho
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      // se clicar em ok chama evento de excluir
      if (result) {
        this.excluir(id);
      }
    });
  }
}
