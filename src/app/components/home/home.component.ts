import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  user: any;
  obtenerUsuarioSubscription: Subscription|any;

  constructor(private usuarioService: UsuarioService) { }
  
  ngOnInit(): void {
    this.obtenerUsuarioSubscription = this.usuarioService.obtenerUsuario().subscribe({ next: (user) => {
      this.user = user;
    }});
  }
  
  ngOnDestroy(): void {
    this.obtenerUsuarioSubscription.unsubscribe();
  }

  async cerrarSesion() {
    await this.usuarioService.cerrarSesion();
  }
}
