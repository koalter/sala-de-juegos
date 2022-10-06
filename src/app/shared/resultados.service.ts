import { Injectable } from '@angular/core';
import { addDoc, Firestore, getDocs, limit, orderBy, Timestamp, where } from '@angular/fire/firestore';
import { collection, query } from '@firebase/firestore';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadosService {

  constructor(private firestore : Firestore,
    private usuarioService : UsuarioService) { }

  async getResultados(juego : string) : Promise<any[]> {
    const result : any[] = [];
    const usuario = this.usuarioService.nombreDeUsuario();

    try {
      const q = usuario ? 
        query(collection(this.firestore, 'juegos', juego, 'resultados'), where('usuario', '==', usuario), orderBy('fecha', 'desc'), limit(10))
        : query(collection(this.firestore, 'juegos', juego, 'resultados'), orderBy('fecha', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => result.push(doc.data()));
      
      return result;

    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }

  async subirResultados(juego : string, resultados : any) {
    try {
      resultados.usuario = this.usuarioService.nombreDeUsuario();
      resultados.fecha = Timestamp.now();

      const docRef = await addDoc(collection(this.firestore, 'juegos', juego, 'resultados'), resultados);
      return docRef.id;
    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }
}
