import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { SaleService } from '../../service/sale.service';
import { SaleDialogComponent } from '../sale-dialog/sale-dialog.component';
import { Sale } from './sale';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule
  ],
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {

  currentSale: Sale | null = null;

  constructor(
    private saleService: SaleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  openSaleDialog(): void {
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      width: '700px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const sale: Sale = {
          products: result.products,
          paymentId: result.paymentId,
          totalValue: result.totalValue
        };
        this.saleService.save(sale).subscribe({
          next: (saved) => {
            this.currentSale = saved;
            this.snackBar.open('Venda realizada com sucesso!', 'Fechar', { duration: 3000 });
          },
          error: () => {
            this.snackBar.open('Erro ao realizar venda.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  newSale(): void {
    this.currentSale = null;
    this.openSaleDialog();
  }
}
