import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private auth: Auth,
    private firestore: Firestore) { }
  
  async iniciarSesion(correo: string, clave: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return result.user;

    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  async registrar(correo: string, clave: string, nombre? : string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave)
      await updateProfile(result.user, { displayName: nombre });
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return result.user;

    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  public obtenerUsuario() {
    return this.auth.currentUser;
  }

  public nombreDeUsuario() {
    const result = this.auth.currentUser;
    return result?.displayName || result?.email;
  }

  public async cerrarSesion() {
    try {
      await signOut(this.auth);
    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      throw error;
    }
  }
}
