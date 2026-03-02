import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../service/product.service';
import { PaymentService } from '../../service/payment.service';
import { Product } from '../product/product';
import { Payment } from '../payment/payment';
import { SaleProducts } from './saleProducts';
import { SalePayment } from './salePayment';

@Component({
  selector: 'app-sale-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ],
  templateUrl: './sale-dialog.component.html',
  styleUrls: ['./sale-dialog.component.scss']
})
export class SaleDialogComponent implements OnInit {

  products: Product[] = [];
  payments: Payment[] = [];
  saleItems: SaleProducts[] = [];
  selectedPayment: SalePayment | null = null;

  itemForm: FormGroup;
  paymentForm: FormGroup;

  displayedColumns: string[] = ['productName', 'quantity', 'unitPrice', 'totalPrice', 'actions'];

  get totalValue(): number {
    return this.saleItems.reduce((sum, item) => sum + (item.unitPrice || 0) * item.quantity, 0);
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private paymentService: PaymentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.itemForm = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.paymentForm = this.fb.group({
      paymentId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getActive().subscribe(data => this.products = data);
    this.paymentService.getActive().subscribe(data => this.payments = data);
  }

  addItem(): void {
    if (this.itemForm.valid) {
      const productId = this.itemForm.value.productId;
      const product = this.products.find(p => p.id === productId);
      if (!product) return;

      const existing = this.saleItems.find(i => i.productId === productId);
      if (existing) {
        existing.quantity += this.itemForm.value.quantity;
      } else {
        this.saleItems = [...this.saleItems, {
          productId,
          productName: product.name,
          quantity: this.itemForm.value.quantity,
          unitPrice: product.price
        }];
      }
      this.itemForm.patchValue({ productId: null, quantity: 1 });
    }
  }

  removeItem(item: SaleProducts): void {
    this.saleItems = this.saleItems.filter(i => i.productId !== item.productId);
  }

  confirm(): void {
    if (this.saleItems.length === 0) {
      this.snackBar.open('Adicione ao menos um produto.', 'Fechar', { duration: 3000 });
      return;
    }
    if (!this.paymentForm.valid) {
      this.snackBar.open('Selecione uma forma de pagamento.', 'Fechar', { duration: 3000 });
      return;
    }
    const paymentId = this.paymentForm.value.paymentId;
    const payment = this.payments.find(p => p.id === paymentId);
    this.dialogRef.close({
      products: this.saleItems,
      paymentId,
      paymentName: payment?.name,
      totalValue: this.totalValue
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
