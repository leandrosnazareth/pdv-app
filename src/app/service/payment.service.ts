import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app-constants';
import { Payment } from '../page/payment/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = `${API_URL}/payments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  save(payment: Payment): Observable<Payment> {
    if (payment.id) {
      return this.http.put<Payment>(`${this.apiUrl}/${payment.id}`, payment);
    }
    return this.http.post<Payment>(this.apiUrl, payment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getActive(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/active`);
  }
}
