import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { Encuesta } from '../models/Encuesta';
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

  async traerTodas() : Promise<Encuesta[]> {
    const respuesta : Encuesta[] = [];
    
    try {
      const q = query(collection(this.firestore, 'encuestas'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        const data = doc.data();
        const item : Encuesta = {
          usuario: doc.id,
          nombre: data['nombre'] as string,
          apellido: data['apellido'] as string,
          edad: data['edad'] as number,
          telefono: data['telefono'] as number,
          fecha: (data['fecha'] as Timestamp).toDate(),
          juegoPreferido: data['juegoPreferido'] as string,
          recomienda: data['recomienda'] as boolean,
          puntajeJuegoPropio: data['puntajeJuegoPropio'] as number
        };

        respuesta.push(item);
      });

      return respuesta;

    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }
}
