import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginValid = true;
  public username = '';
  public password = '';

  formulario: FormGroup;
  usuario = { username: '', password: '' };
  token: any;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  public onSubmit() {
    this.usuario.username = this.username;
    this.usuario.password = this.password;
    this.loginService.login(this.usuario);
  }

  public recuperar() {
    this.loginService.recuperar(this.usuario.username);
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    if (this.token !== null &&
      this.token.toString().trim() !== null) {
      this.router.navigate(['home']);
    }
  }
}
