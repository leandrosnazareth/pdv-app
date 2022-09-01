import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: any;

  constructor(private http: HttpClient) {
  }

  userAutenticado() {
    this.token = localStorage.getItem('token');
    console.info(this.token);
    if (this.token !== null &&
      this.token.toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }
}
