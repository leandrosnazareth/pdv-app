import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductService } from '../../service/product.service';
import { Product } from './product';
import { ConfirmaDeleteComponent } from '../../util/confirma-delete/confirma-delete.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'active', 'actions'];
  products: Product[] = [];
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;

  productForm: FormGroup;
  editingProduct: Product | null = null;
  showForm = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      active: [true]
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.content;
        this.totalElements = data.totalElements;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar produtos.', 'Fechar', { duration: 3000 });
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  openForm(product?: Product): void {
    this.showForm = true;
    if (product) {
      this.editingProduct = product;
      this.productForm.patchValue(product);
    } else {
      this.editingProduct = null;
      this.productForm.reset({ active: true, price: 0, quantity: 0 });
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset({ active: true, price: 0, quantity: 0 });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        id: this.editingProduct?.id
      };
      this.productService.save(product).subscribe({
        next: () => {
          this.snackBar.open('Produto salvo com sucesso!', 'Fechar', { duration: 3000 });
          this.cancelForm();
          this.loadProducts();
        },
        error: () => {
          this.snackBar.open('Erro ao salvar produto.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmaDeleteComponent, {
      data: { message: `Deseja excluir o produto "${product.name}"?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && product.id) {
        this.productService.delete(product.id).subscribe({
          next: () => {
            this.snackBar.open('Produto excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.loadProducts();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir produto.', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }
}
