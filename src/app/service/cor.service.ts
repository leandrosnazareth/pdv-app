import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cor } from '../page/item/cor/cor';
import { PaginacaoCor } from '../page/item/cor/paginacaoCor';

@Injectable({
  providedIn: 'root',
})

export class CorService {
  apiURL: string = environment.apiBaseUrl + 'cor';

  constructor(private http: HttpClient) { }

  save(cor: Cor): Observable<Cor> {
    return this.http.post<Cor>(this.apiURL, cor);
  }

  list(page: number, size: number): Observable<PaginacaoCor> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<any>(`${this.apiURL}?${params.toString()}`);
  }

  update(cor: Cor): Observable<any> {
    return this.http.put<Cor>(`${this.apiURL}/${cor.id}`, cor);
  }

  findCorById(id: number): Observable<Cor> {
    return this.http.get<any>(`${this.apiURL}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

}
