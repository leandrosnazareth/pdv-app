import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app-constants';
import { Product } from '../page/product/product';
import { PaginacaoProduct } from '../page/product/paginacaoProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${API_URL}/products`;

  constructor(private http: HttpClient) {}

  getAll(page: number = 0, size: number = 10): Observable<PaginacaoProduct> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaginacaoProduct>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  save(product: Product): Observable<Product> {
    if (product.id) {
      return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
    }
    return this.http.post<Product>(this.apiUrl, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getActive(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/active`);
  }
}
