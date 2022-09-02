import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoProduct } from '../page/product/paginacaoProduct';
import { Product } from '../page/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL: string = environment.apiBaseUrl + 'product';

  constructor(private http: HttpClient) { }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiURL, product);
  }

  list(page: number, size: number): Observable<PaginacaoProduct> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  update(product: Product): Observable<any> {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product);
  }

  findProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  findProductByIdActive(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiURL}/active/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  totalProdutos(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/count`);
  }

  totalProdutosAtivos(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/active`);
  }
}