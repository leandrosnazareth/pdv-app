import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Payment } from '../page/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiURL: string = environment.apiBaseUrl + 'payment';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Payment> {
    return this.http.get<any>(`${this.apiURL}`);
  }
}
