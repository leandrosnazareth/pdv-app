import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SaleService } from 'src/app/service/sale.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Sale } from '../sale/sale';

@Component({
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  sales: Sale[] = [];
  ordemColunasTabela = ['id', 'amount', 'amountPaid', 'difference', 'payment', 'excluir'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend

  constructor(
    private saleService: SaleService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.listSales(this.pagina, this.tamanho);
  }

  listSales(pagina: number, tamanho: number) {
    this.saleService.list(pagina, tamanho).subscribe((response) => {
      this.sales = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
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

  private excluir(id: number) {
    this.saleService.delete(id).subscribe((response) => {
      this.ngOnInit();
      this.mensagemErros = [];
      // exibir mensagem snackbar
      this.snackBar.open('Venda excluida com sucesso!', 'Sucesso', {
        duration: 2000
      })
    }, errorResponse => {
      // exibe mensagem de erro da api
      this.mensagemErros = ['Erro: ' + errorResponse.error.message];
    })
  }

  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listSales(this.pagina, this.tamanho);
  }
}
