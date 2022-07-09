import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoSale } from '../page/sale/paginacaoSales';
import { Sale } from '../page/sale/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  apiURL: string = environment.apiBaseUrl + 'sale';

  constructor(private http: HttpClient) { }

  save(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiURL, sale);
  }

  list(page: number, size: number): Observable<PaginacaoSale> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  somaTotal(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/somatotal`);
  }

  totalVendas(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/count`);
  }

  salesLimit(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/limit`);
  }
}