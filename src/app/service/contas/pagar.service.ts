import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagar } from 'src/app/page/contas/pagar/pagar/pagar';
import { PaginacaoPagar } from 'src/app/page/contas/pagar/pagar/paginacaoPagar';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagarService {
  
  apiURL: string = environment.apiBaseUrl + 'pagar';

  constructor(private http: HttpClient) { }

  save(pagar: Pagar): Observable<Pagar> {
    return this.http.post<Pagar>(this.apiURL, pagar);
  }

  list(page: number, size: number): Observable<PaginacaoPagar> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  update(pagar: Pagar): Observable<any> {
    return this.http.put<Pagar>(`${this.apiURL}/${pagar.id}`, pagar);
  }

  findPagarById(id: number): Observable<Pagar> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

}
