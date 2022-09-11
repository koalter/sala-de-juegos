import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  nombre: string = '';
  clave: string = '';

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  async iniciarSesion() {
    const result = await this.usuarioService.iniciarSesion(this.nombre, this.clave);
    if (result) {
      await this.router.navigateByUrl('/');
    }
  }

}
