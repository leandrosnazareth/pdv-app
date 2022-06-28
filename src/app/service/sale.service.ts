import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}