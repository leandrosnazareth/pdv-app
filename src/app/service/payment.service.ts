import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiURL: string = environment.apiBaseUrl + 'payment';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<any>(`${this.apiURL}`);
  }
}
