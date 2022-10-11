import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario : any;

  constructor() { }

  public nombreDeUsuario() {
    return this.usuario?.displayName || this.usuario?.email;
  }

}
