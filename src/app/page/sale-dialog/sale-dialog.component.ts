import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from 'src/app/service/payment.service';
import { Payment } from '../payment/payment';

@Component({
  selector: 'app-example-dialog',
  templateUrl: 'sale-dialog.component.html',
})
export class SaleDialogComponent {

  private paymentService: PaymentService;
  payments: Payment[] = [];

  constructor(
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  listPayment() {
    this.paymentService.findAll().subscribe((response) => {
      this.payments = response;
    });
  }
}