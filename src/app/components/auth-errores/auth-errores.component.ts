import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'auth-errores',
  templateUrl: './auth-errores.component.html',
  styleUrls: ['./auth-errores.component.scss']
})
export class AuthErroresComponent implements OnInit {

  @Input() error: string;
  @Output() volver: EventEmitter<any> = new EventEmitter<any>();
  mensaje: string;

  constructor() { }
  
  ngOnInit(): void {
    switch (this.error) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        this.mensaje = '¡Usuario/contraseña incorrectos!';
        break;
      case 'auth/invalid-email':
        this.mensaje = '¡Usuario inválido!';
        break;
      case 'auth/email-already-in-use':
        this.mensaje = '¡El usuario ya existe!';
        break;
      case 'auth/weak-password':
        this.mensaje = '¡Contraseña inválida!';
        break;
      case 'auth/too-many-requests':
        this.mensaje = '¡Demasiadas peticiones hechas al servidor!';
        break;
      default:
        this.mensaje = 'Error inesperado.';
        break;
    }
  }

  btnVolver_click(): void {
    this.volver.emit();
  }
}
