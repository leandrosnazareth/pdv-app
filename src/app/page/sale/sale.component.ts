import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import parseMoney from 'parse-money';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { SaleDialogComponent } from '../sale-dialog/sale-dialog.component';
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
  statusCaixa = "Caixa Livre";
  payment: String;
  data: any
  pagar: any;

  constructor(
    private productService: ProductService,
    private saleService: SaleService,
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

  limparFormulario() {
    this.formAddItem.reset();
    this.productsSolds = [];
    this.statusCaixa = "Caixa Livre";
  }

  submit() {

  }

  openDialog(): void {
    //abrir dialog
    let dialogRef = this.dialog.open(SaleDialogComponent, {
      width: '500px',
      data: {
        //itens que serão levados do pdv para o dialog
        pagar: this.pagar
      }
    });
    //confirmar venda
    dialogRef.afterClosed().subscribe(result => {
      console.log(result.pagar);
      console.log(result.pago);
      console.log(result.troco);
      console.log(parseFloat(result.pago.replace(",",".")));
      console.log(parseFloat(result.troco.replace(",",".")));
      // this.data = result;
      const venda = new Sale(
        0,
        result.pagar,
        parseFloat(result.pago.replace(",",".")),
        // parseMoney(result.troco)?.amount.toFixed(2),
        parseFloat(result.troco.replace(",",".")),
        "DINHEIRO",
        this.productsSolds
        );

      console.log(venda);
      //salvar venda
      this.saleService.save(venda).subscribe(resposta => {
        this.snackBar.open('Venda realizada com sucesso!', 'Sucesso', {
          duration: 2000
        })
        //limpar formulário
        this.limparFormulario;
      }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
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
      // this.statusCaixa = response.name;
      this.statusCaixa = "Venda em Aberto";
    })
  }

  getTotalCost() {
    this.pagar = this.productsSolds.map(t => t.priceTotal).reduce((acc, value) => acc + value, 0)
    return this.pagar;
  }
}