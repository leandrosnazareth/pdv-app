import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CorService } from 'src/app/service/cor.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Cor } from './cor';


@Component({
  templateUrl: './cor.component.html',
  styleUrls: ['./cor.component.scss']
})
export class CorComponent implements OnInit {

  formulario: FormGroup;
  //lista de cores para exiboir
  cores: Cor[] = [];
  //ordem das colunas no html
  ordemColunasTabela = ['id', 'nome', 'abreviacao', 'excluir', 'editar'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  //array de strings dos erros retornados do backend
  mensagemErros: String[] = [];

  constructor(
    private corService: CorService,
    private formBilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarCores(this.pagina, this.tamanho);

  }

  submit() {
    //verifica se contem erros no formulário
    const erroNomeRequired = this.formulario.controls.nome.errors;
    const erroEmailInvalido = this.formulario.controls.abreviacao.errors;

    //pegar os dados do formulário
    const formValues = this.formulario.value;
    if (formValues.id) {
      // cria e adiciona no objeto
      const cor: Cor = new Cor(formValues.id, formValues.nome, formValues.abreviacao);
      this.corService.update(cor).subscribe(resposta => {
        this.listarCores(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Cor alterada com sucesso!', 'Sucesso', {
          duration: 2000
        })
      });
    } else {
      // cria e adiciona no objeto
      const cor: Cor = new Cor(0, formValues.nome, formValues.abreviacao);
      this.corService.save(cor).subscribe(resposta => {
        // add o objeto a lista para listar ... é a lista antiga
        this.listarCores(this.pagina, this.tamanho);
        // exibir mensagem snackbar
        this.snackBar.open('Cor salva com sucesso!', 'Sucesso', {
          duration: 2000
        })
      });
    }
    //limpar formulário
    this.formulario.reset();
  }

  validarObrigatoriedade(input: FormControl) {

  }

  montarFormulario() {
    this.formulario = this.formBilder.group({
      //validando os dados do formulário
      id: [null, Validators.nullValidator],
      nome: [null, Validators.required],
      abreviacao: [null, Validators.required],
    })
  }

  limparFormulario() {
    this.formulario.reset();
  }

  listarCores(pagina: number, tamanho: number) {// definir a primeira página e o tamanho inicial
    this.corService.list(pagina, tamanho).subscribe((response) => {
      this.cores = response.content; // pegar o conteudo do pag
      this.totalElementos = response.totalElements;// pegar o total de elementos
      this.pagina = response.number;// pegar o numero de paginas
    });
  }

  private excluir(id: number) {
    this.corService.delete(id).subscribe((response) => {
      this.ngOnInit();
      this.mensagemErros =[];
      // exibir mensagem snackbar
      this.snackBar.open('Cor excluida com sucesso!', 'Sucesso', {
        duration: 2000
      })
    }, errorResponse => {
        // exibe mensagem de erro da api
        this.mensagemErros = ['Erro: ' + errorResponse.error.message];
      })
  }

  editar(id: number) {
    this.corService.findCorById(id).subscribe((response) => {
      const formValues = this.formulario.value;
      // cria e adiciona no objeto
      this.formulario.controls.id.setValue(id);
      this.formulario.controls.abreviacao.setValue(response.abreviacao);
      this.formulario.controls.nome.setValue(response.nome);
    })
  }

  //chamar a paginação
  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;// setar a pagina que deseja ir
    this.tamanho = event.pageSize; // quantidade de linhas
    this.listarCores(this.pagina, this.tamanho);// chama o listar contatos passando a pagina e o tamanho
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
