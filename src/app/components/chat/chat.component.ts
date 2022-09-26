import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatLog } from 'src/app/models/ChatLog';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  nuevosMensajes : boolean = false;
  toggleChat : boolean = false;
  mensajes : ChatLog[] = [];
  mensajesLeidos : number;
  mensajes$ : Subscription;

  constructor(private chatService : ChatService) { }

  ngOnInit(): void {
    this.mensajes$ = this.chatService.recuperarMensajes().subscribe(m => {
      this.mensajes = m;
      this.mensajesLeidos = this.mensajes.length;
      setInterval(() => {
        console.log(this.mensajes.length, ' ', this.mensajesLeidos);
        this.nuevosMensajes = this.mensajes.length != this.mensajesLeidos;
      }, 100);
    });
  }

  ngOnDestroy() : void {
    this.mensajes$.unsubscribe();
  }

  abrirChat() : void {
    this.nuevosMensajes = false;
    this.toggleChat = true;
  }

  cerrarChat(cantidadDeMensajes : number) {
    this.toggleChat = !this.toggleChat;
    this.mensajesLeidos = cantidadDeMensajes;

  }

  enviarMensaje(mensaje : ChatLog) {
    this.chatService.agregarMensaje(mensaje);
  }

}
