import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app-constants';
import { Sale } from '../page/sale/sale';
import { PaginacaoSales } from '../page/sale/paginacaoSales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private apiUrl = `${API_URL}/sales`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<PaginacaoSales> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginacaoSales>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  save(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
