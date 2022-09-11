import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, user } from '@angular/fire/auth';
import { redirectLoggedInTo } from '@angular/fire/auth-guard';
import { collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { addDoc, getDocs } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth: Auth,
    private firestore: Firestore) { }
  
  async iniciarSesion(correo: string, clave: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()).toString() });
      return result.user;

    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      return null;
    }
  }

  async registrar(correo: string, clave: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave)
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()).toString() });
      return result.user;
    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      return null;
    }
  }

  public obtenerUsuario() {
    return user(this.auth);
  }

  public async cerrarSesion() {
    await signOut(this.auth);
  }
}
