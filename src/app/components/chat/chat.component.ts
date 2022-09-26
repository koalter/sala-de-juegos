import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { onSnapshot } from '@firebase/firestore';
import { ChatLog } from 'src/app/models/ChatLog';

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

  constructor(private firestore : Firestore) { }

  ngOnInit(): void {
    this.mensajes$ = onSnapshot(collection(this.firestore, 'chat'), querySnapshot => {
      const mensajes : ChatLog[] = [];
      querySnapshot.forEach(document => {
        const data = document.data();
        const log = new ChatLog(data['mensaje'], data['usuario'], data['tiempo'].toDate());
        mensajes.push(log);
      });
  
      this.mensajes = mensajes.sort((pre, pro) => {
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
    const docRef = addDoc(collection(this.firestore, 'chat'), {
      mensaje: mensaje.mensaje,
      usuario: mensaje.usuario,
      tiempo: mensaje.tiempo
    }).then(res => console.log(res))
    .catch(err => console.error(err));
  }

}
