import { Injectable } from '@angular/core';
import { addDoc, Firestore, getDocs, onSnapshot, query } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { of } from 'rxjs';
import { ChatLog } from '../models/ChatLog';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private coleccion = collection(this.firestore, 'chat');
  private mensajes : ChatLog[] = [];

  constructor(private firestore : Firestore) {
    // setInterval(() => {
    //   this.agregarMensaje({
    //     mensaje: "Soy un bot ¿y tú?",
    //     usuario: "bot1@example.com",
    //     tiempo: new Date(Date.now())
    //   });
    // }, 5000);
  }

  async recuperarMensajes() {
    return onSnapshot(this.coleccion, (querySnapshot) => {
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
    });

  }

  async agregarMensaje(log : ChatLog) {
    try {
      const docRef = await addDoc(this.coleccion, {
        mensaje: log.mensaje,
        usuario: log.usuario,
        tiempo: log.tiempo
      });
      return docRef.id;
    } catch (err) {
      // this.logger.logError(err);
      throw err;
    }
  }
}
