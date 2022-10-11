import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { addDoc, collection, Firestore, Timestamp } from '@angular/fire/firestore';
import { UsuarioService } from '../../shared/usuario.service';

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

  constructor(private usuarioService : UsuarioService,
    private auth : Auth,
    private firestore : Firestore) { 
    
    this.auth.onAuthStateChanged(user => {
      this.usuarioService.setUsuario(user).finally(() => {
        this.usuario = user;
        this.cargarSpinner = false;
      });
    });
  }
  
  ngOnInit(): void {
  }

  async iniciarSesion({ correo, clave }) {
    this.cargarSpinner = true;
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });

    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      console.error(err);

    } finally {
      this.cargarSpinner = false;
    }
  }

  async registrarUsuario({ correo, clave, nombre }) {
    this.cargarSpinner = true;
    let error = '';
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave)
      await updateProfile(result.user, { displayName: nombre });
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      this.usuarioService.usuario = result.user;
      this.usuario = result.user;

    } catch (err : any) {
      addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      console.error(err);

    } finally {
      this.cargarSpinner = false;
    }
  }

  async cerrarSesion() {
    this.cargarSpinner = true;
    try {
      await signOut(this.auth);
      this.usuarioService.usuario = null;
      this.usuario = null;
      this.modoLogin = 'login';

    } catch (error : any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: error.toString(), fecha: Timestamp.now() });
      console.error(error);

    } finally {
      this.cargarSpinner = false;
    }
  }

  manejadorAuthErrores() {
    this.error = '';
  }
}
