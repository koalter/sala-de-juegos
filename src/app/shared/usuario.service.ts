import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User, user } from '@angular/fire/auth';
import { collection, Firestore } from '@angular/fire/firestore';
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
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()) });
      return result.user;

    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      throw err;
    }
  }

  async registrar(correo: string, clave: string, nombre? : string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave)
      await updateProfile(result.user, { displayName: nombre });
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()) });
      return result.user;

    } catch (err) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err });
      throw err;
    }
  }

  public obtenerUsuario() {
    return this.auth.currentUser;
  }

  public async cerrarSesion() {
    try {
      await signOut(this.auth);
    } catch (error) {
      await addDoc(collection(this.firestore, 'logErrores'), error);
      throw error;
    }
  }
}
