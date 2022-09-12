import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario: any;
  modoLogin: string = 'login';
  cargarSpinner: boolean = true;
  error: string = '';

  constructor(private auth: Auth,
    private firestore: Firestore) { }
  
  ngOnInit(): void {
    this.auth.onAuthStateChanged(user => {
      this.usuario = user;
      this.cargarSpinner = false;
    });
  }

  async iniciarSesion({ correo, clave }) {
    this.cargarSpinner = true;
    let error = '';
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()).toString() });
      this.usuario = result.user;

    } catch (err: any) {
      console.error(err.code);
      error = err.code;
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.message, fecha: new Date(Date.now()).toString() });
      this.usuario = null;
    } finally {
      this.cargarSpinner = false;
      this.error = error;
    }
  }

  async registrarUsuario({ correo, clave, nombre }) {
    this.cargarSpinner = true;
    let error = '';
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave);
      await updateProfile(result.user, { displayName: nombre });
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()).toString() });
      this.usuario = result.user;

    } catch (err: any) {
      console.error(err.code);
      error = err.code;
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.message, fecha: new Date(Date.now()).toString() });
      this.usuario = null;
    } finally {
      this.cargarSpinner = false;
      this.error = error;
    }
  }

  async cerrarSesion() {
    this.cargarSpinner = true;
    await this.auth.signOut();
    this.modoLogin = 'login';
    this.cargarSpinner = false;
  }

  manejadorAuthErrores() {
    this.error = '';
  }
}
