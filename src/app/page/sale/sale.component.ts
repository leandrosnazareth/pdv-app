import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { ExampleDialogComponent } from '../example-dialog/example-dialog.component';
import { ProductSold } from './productSold';
import { Sale } from './sale';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  productsSolds: ProductSold[] = [];
  formAddItem: FormGroup;
  //lista de products para exiboir
  sales: Sale[] = [];
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'quantity', 'name', 'price', 'priceTotal'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend
  animal: string;
  name: string;

  constructor(
    private productService: ProductService,
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
  }

  montarFormulario() {
    this.formAddItem = this.formBilder.group({
      //validando os dados do formulário
      id: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(1)]],
      quantidade: [null, [Validators.required, Validators.maxLength(50)]],
    })
  }

  submit() {

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(ExampleDialogComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  adicionarItem() {
    const formValues = this.formAddItem.value;
    this.productService.findProductById(formValues.id).subscribe((response) => {
      const total = response.price * formValues.quantidade;
      const productSold = new ProductSold(
        0,
        response,
        response.price,
        total,
        formValues.quantidade
      );
      this.productsSolds = this.productsSolds.concat(productSold);
    })
  }

  getTotalCost() {
    return this.productsSolds.map(t => t.priceTotal).reduce((acc, value) => acc + value, 0);
  }
}
