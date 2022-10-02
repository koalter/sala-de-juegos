import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { createClient } from 'pexels';
import { Preguntados } from '../models/preguntados';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService {

  private _apiClient = createClient('563492ad6f91700001000001f8d74e5d0fe04f7cb8066842523b385f');

  constructor(private firestore : Firestore) { }

  async generarPregunta() {
    try {
      const q = query(collection(this.firestore, "preguntados"));
      const querySnapshot = await getDocs(q);
      const index = Math.floor(Math.random() * querySnapshot.size);
      
      const result = querySnapshot.docs[index].data();
      result["respuestas"] = this.mezclarRespuestas(result["respuestas"]);

      return new Preguntados(result["pregunta"], result["categoria"], result["imagen"], result["respuestas"]);

    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      throw err;
    }
  }

  private mezclarRespuestas(respuestas : any[]) {
    let count = respuestas.length;
    let index : number;
    let temp : any;
    
    while(count > 0) {
        index = Math.floor(Math.random() * count);
        count--;

        temp = respuestas[count];
        respuestas[count] = respuestas[index];
        respuestas[index] = temp;
    }

    return respuestas;
  }

  async obtenerImagen(id : number) {
    try {
      const result = await this._apiClient.photos.show({ id: id });
      return result["src"]["medium"];
      
    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      return "";
    }
  }
  
}
