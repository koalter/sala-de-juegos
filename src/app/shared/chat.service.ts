import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ChatLog } from '../models/ChatLog';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private mensajes : ChatLog[] = [{
    mensaje: "Hola este es un mensaje de prueba!",
    usuario: "bot1@example.com",
    tiempo: new Date(Date.now())
  }];

  constructor() { 
    setInterval(() => {
      this.agregarMensaje({
        mensaje: "Soy un bot ¿y tú?",
        usuario: "bot1@example.com",
        tiempo: new Date(Date.now())
      });
    }, 5000);
  }

  recuperarMensajes() {
    return of(this.mensajes);
  }

  agregarMensaje(mensaje : ChatLog) {
    this.mensajes.push(mensaje);
  }
}
