import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/shared/usuario.service';

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

  constructor(private usuarioService : UsuarioService) { 

    this.usuario = this.usuarioService.obtenerUsuario();
    this.cargarSpinner = false;
  }
  
  ngOnInit(): void {
  }

  async iniciarSesion({ correo, clave }) {
    this.cargarSpinner = true;
    try {
      this.usuario = await this.usuarioService.iniciarSesion(correo, clave);

    } catch (err: any) {
      this.error = err.code;
      this.usuario = null;
    } finally {
      this.cargarSpinner = false;
    }
  }

  async registrarUsuario({ correo, clave, nombre }) {
    this.cargarSpinner = true;
    let error = '';
    try {
      this.usuario = await this.usuarioService.registrar(correo, clave, nombre);

    } catch (err: any) {
      this.error = err.code;
      this.usuario = null;
    } finally {
      this.cargarSpinner = false;
    }
  }

  async cerrarSesion() {
    this.cargarSpinner = true;
    await this.usuarioService.cerrarSesion();
    this.usuario = null;
    this.modoLogin = 'login';
    this.cargarSpinner = false;
  }

  manejadorAuthErrores() {
    this.error = '';
  }
}
