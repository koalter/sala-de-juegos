import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  mensajes : string[] = [];

  constructor() { }

  recuperarMensajes() {
    return this.mensajes;
  }

  agregarMensaje(mensaje : string) {
    this.mensajes.push(mensaje);
  }
}
