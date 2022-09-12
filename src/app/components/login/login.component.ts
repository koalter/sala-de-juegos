import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() setUsuario: EventEmitter<any> = new EventEmitter<any>();
  correo: string = '';
  clave: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  enviarCredenciales() {
    this.setUsuario.emit({ correo: this.correo, clave: this.clave });
  }

  usarDatosDePrueba(correo: string, clave: string) {
    this.correo = correo;
    this.clave = clave;
  }

}
