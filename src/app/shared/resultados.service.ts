import { Injectable } from '@angular/core';
import { addDoc, Firestore, getDocs, where } from '@angular/fire/firestore';
import { collection, query } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private firestore : Firestore) { }

  async getResultados(juego : string, usuario? : string) : Promise<any[]> {
    const result : any[] = [];

    try {
      const q = usuario ? 
        query(collection(this.firestore, 'juegos', juego, 'resultados'), where('usuario', '==', usuario))
        : query(collection(this.firestore, 'juegos', juego, 'resultados'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => result.push(doc.data()));
      
      return result;

    } catch (error) {
      await addDoc(collection(this.firestore, 'logErrores'), error);
      throw error;
    }
  }

  async subirResultados(juego : string, resultados : any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'juegos', juego, 'resultados'), resultados);
      return docRef.id;
    } catch (error) {
      await addDoc(collection(this.firestore, 'logErrores'), error);
      throw error;
    }
  }
}
