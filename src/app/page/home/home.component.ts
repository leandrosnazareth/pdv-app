import { Component, OnInit } from '@angular/core';
import { SaleService } from 'src/app/service/sale.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalVendas: number;

  constructor(
    private saleService: SaleService
  ) { }

  ngOnInit() {
    this.somarVendas();
  }

  somarVendas() {
    this.saleService.somaTotal().subscribe((response) => {
      this.totalVendas = response;
    })
  }
}
