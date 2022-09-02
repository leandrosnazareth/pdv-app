import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  token: string;

  constructor(private router: Router) {

  }

  ngOnInit(): void {

    if (localStorage.getItem('token') == null) {
      this.router.navigate(['login']);
    }

  }

  public sair() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


  public esconderBarrar() {
    this.token == localStorage.getItem('token');
    if (this.token !== null &&
      this.token.toString().trim() !== null) {
      return false;
    } else {
      return true;
    }
  }
}
