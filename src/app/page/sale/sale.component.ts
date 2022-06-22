import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { ProductSold } from './productSold';
import { Sale } from './sale';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  productsSolds: ProductSold[] = [];
  formulario: FormGroup;
  //lista de products para exiboir
  sales: Sale[] = [];
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'quantity', 'name', 'price'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend
  
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
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, [Validators.required, Validators.maxLength(13), Validators.minLength(1)]],
      quantidade: [null, [Validators.required, Validators.maxLength(50)]],
    })
  }

  submit() { }

  adicionarItem() {
    const formValues = this.formulario.value;
    this.productService.findProductById(formValues.id).subscribe((response) => {
      const productSold = new ProductSold(0, response, response.price, formValues.quantidade);
      this.productsSolds = this.productsSolds.concat(productSold);
    })
  }

  getTotalCost() {
    return this.productsSolds.map(t => t.price.valor).reduce((acc, value) => acc + value, 0);
  }

}
