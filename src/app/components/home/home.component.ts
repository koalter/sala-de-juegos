import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuario: any;
  modoLogin: string = 'login';

  constructor(private auth: Auth,
    private firestore: Firestore) { }
  
  ngOnInit(): void {
    this.usuario = this.auth.currentUser;
  }

  async iniciarSesion({ correo, clave }) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: new Date(Date.now()).toString() });
      this.usuario = result.user;

    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.message, fecha: new Date(Date.now()).toString() });
      this.usuario = null;
    }
  }

  cerrarSesion() {
    this.usuario = null;
  }
}
