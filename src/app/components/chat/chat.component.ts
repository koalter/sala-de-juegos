import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { collection, Firestore } from '@angular/fire/firestore';
import { onSnapshot } from '@firebase/firestore';
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
  mensajes$ : Unsubscribe;

  constructor(private chatService : ChatService,
    private firestore : Firestore) { }

  ngOnInit(): void {
    this.mensajes$ = onSnapshot(collection(this.firestore, 'chat'), querySnapshot => {
      querySnapshot.forEach(document => {
        const data = document.data();
        const pelicula = new ChatLog(data['mensaje'], data['usuario'], data['tiempo'].toDate());
        this.mensajes.push(pelicula);
      });
  
      return this.mensajes.sort((pre, pro) => {
        if (pre.tiempo > pro.tiempo) return 1;
        if (pre.tiempo < pro.tiempo) return -1;
        return 0;
      });
    }) 
  }

  ngOnDestroy() : void {
    this.mensajes$();
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
    this.chatService.agregarMensaje(mensaje).catch(err => console.error(err));
  }

}
