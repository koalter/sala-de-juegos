import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/shared/encuesta.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {

  respondioEncuesta : boolean = true;
  esAdministrador : boolean = false;

  constructor(private encuestaService : EncuestaService,
    private usuarioService : UsuarioService) { 
    this.encuestaService.getEncuesta().then(res => {
      this.respondioEncuesta = res != null;
    });
    this.esAdministrador = this.usuarioService.rol.toLowerCase() === 'administrador';
  }

  ngOnInit(): void {
  }

}
