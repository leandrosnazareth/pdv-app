import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Product } from './product';
import parseMoney from 'parse-money';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  formulario: FormGroup;
  //lista de products para exiboir
  products: Product[] = [];
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'name', 'price', 'active', 'excluir', 'editar'];
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
    this.listarProductes(this.pagina, this.tamanho);
  }

  submit() {
    //pegar os dados do formulário
    const formValues = this.formulario.value;
    // cria e adiciona no objeto
    const product: Product = new Product(
      formValues.id,
      formValues.name,
      parseMoney(formValues.price)?.amount.toFixed(2),
      formValues.active);

    if (formValues.id) {
      this.productService.update(product).subscribe(resposta => {
        this.listarProductes(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Produto alterado com sucesso!', 'Sucesso', {
          duration: 2000
        })
        //limpar formulário
        this.formulario.reset();
      }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
    } else {
      // cria e adiciona no objeto
      this.productService.save(product).subscribe(resposta => {
        this.listarProductes(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Produto salvo com sucesso!', 'Sucesso', {
          duration: 2000
        })
        //limpar formulário
        this.formulario.reset();
      }, errorResponse => {
        // exibir mensagem snackbar
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
    }
  }

  montarFormulario() {
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, Validators.nullValidator],
      name: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      price: [null, [Validators.minLength(1), Validators.maxLength(6)]],
      active: [null, Validators.required],
    })
  }

  limparFormulario() {
    this.formulario.reset();
  }

  listarProductes(pagina: number, tamanho: number) {// definir a primeira página e o tamanho inicial
    this.productService.list(pagina, tamanho).subscribe((response) => {
      this.products = response.content; // pegar o conteudo do pag
      this.totalElementos = response.totalElements;// pegar o total de elementos
      this.pagina = response.number;// pegar o numero de paginas
    });
  }

  private excluir(id: number) {
    this.productService.delete(id).subscribe((response) => {
      this.ngOnInit();
      this.mensagemErros = [];
      // exibir mensagem snackbar
      this.snackBar.open('Producto excluido com sucesso!', 'Sucesso', {
        duration: 2000
      })
    }, errorResponse => {
      // exibe mensagem de erro da api
      this.mensagemErros = ['Erro: ' + errorResponse.error.message];
    })
  }

  editar(id: number) {
    this.productService.findProductById(id).subscribe((response) => {
      // cria e adiciona no objeto
      this.formulario.controls.id.setValue(id);
      this.formulario.controls.name.setValue(response.name);
      this.formulario.controls.price.setValue((response.price+"").replace(".",","));
      this.formulario.controls['active'].setValue(response.active?'true':'false');
    })
  }

  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.tamanho = event.pageSize;
    this.listarProductes(this.pagina, this.tamanho);
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