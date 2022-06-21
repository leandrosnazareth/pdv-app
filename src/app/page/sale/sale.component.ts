import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Sale } from './sale';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  formulario: FormGroup;
  //lista de products para exiboir
  sales: Sale[] = [];
  //ordem das colunas no html 
  ordemColunasTabela = ['id', 'name', 'price', 'active', 'excluir', 'editar'];
  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
  mensagemErros: String[] = []; //array de strings dos erros retornados do backend

  constructor() { }

  ngOnInit(): void {
  }

}
