import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app-constants';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${API_URL}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
    }
    return this.http.post<User>(this.apiUrl, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
