import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  constructor(private firestore : Firestore,
    private usuarioService : UsuarioService) { }

  async enviarEncuesta(encuesta : any) {
    try {
      const username = this.usuarioService.nombreDeUsuario();
      
      if (!username) {
        throw new Error("No se encontró una sesión activa!");
      }

      encuesta.fecha = Timestamp.now();
      
      const docRef = await setDoc(doc(this.firestore, 'encuestas', username), encuesta);
      return docRef;
    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }

  async getEncuesta() {
    try {
      const username = this.usuarioService.nombreDeUsuario();
      if (!username) {
        throw new Error("No se encontró una sesión activa!");
      }
      const snapshot = await getDoc(doc(this.firestore, 'encuestas', username));
      
      if (snapshot.exists()) {
        return snapshot.data();
      } 

      return null;
      
    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }
}
