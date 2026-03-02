import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { SaleService } from '../../service/sale.service';
import { Sale } from '../sale/sale';
import { ConfirmaDeleteComponent } from '../../util/confirma-delete/confirma-delete.component';

@Component({
  selector: 'app-sales-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatChipsModule
  ],
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'paymentName', 'totalValue', 'actions'];
  sales: Sale[] = [];
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private saleService: SaleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.sales = data.content;
        this.totalElements = data.totalElements;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar vendas.', 'Fechar', { duration: 3000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSales();
  }

  deleteSale(sale: Sale): void {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent, {
      data: { message: `Deseja excluir a venda #${sale.id}?` }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && sale.id) {
        this.saleService.delete(sale.id).subscribe({
          next: () => {
            this.snackBar.open('Venda excluída com sucesso!', 'Fechar', { duration: 3000 });
            this.loadSales();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir venda.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }
}
