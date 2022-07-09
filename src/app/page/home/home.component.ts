import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { Product } from '../product/product';
import { Sale } from '../sale/sale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalVendas: number;
  valorVendas: number;
  produtosCadastrados: number;
  produtosAtivos: number;
  sales: Sale[] = [];
  ordemColunasTabela = ['id', 'amount', 'amountPaid', 'difference', 'payment'];
  mensagemErros: String[] = [];


  constructor(
    private saleService: SaleService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.somarVendas();
    this.totalDeVendas();
    this.totalProdutos();
    this.totalProdutosAtivos();
    this.listSales();
  }

  somarVendas() {
    this.saleService.somaTotal().subscribe((response) => {
      this.valorVendas = response;
    })
  }

  totalDeVendas() {
    this.saleService.totalVendas().subscribe((response) => {
      this.totalVendas = response;
    })
  }

  totalProdutos() {
    this.productService.totalProdutos().subscribe((response) => {
      this.produtosCadastrados = response;
    })
  }

  totalProdutosAtivos() {
    this.productService.totalProdutosAtivos().subscribe((response) => {
      this.produtosAtivos = response;
    })
  }

  listSales() {
    this.saleService.salesLimit().subscribe((response) => {
      this.sales = response;
    });
  }
}
