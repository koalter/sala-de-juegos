import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nombre: string = '';
  clave: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  enviar(): void {
    const usuario = { nombre: this.nombre, clave: this.clave }
    console.log(usuario);
  }

}
