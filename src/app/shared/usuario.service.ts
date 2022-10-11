import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc, doc, getDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario : User | null;
  rol : string;

  constructor(private firestore : Firestore) { }

  nombreDeUsuario() {
    return this.usuario?.displayName || this.usuario?.email;
  }

  async setUsuario(value : User | null) {
    try {
      if (value == null) {
        throw new Error("¡No se inició sesión en ninguna cuenta!");
      }
      const docRef = doc(this.firestore, 'detalleUsuarios', value.email as string);
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();

      this.rol = data?.['rol'];
      this.usuario = value;
    } catch (err : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

}
