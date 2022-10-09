import { Component, OnInit } from '@angular/core';
import { EncuestaService } from 'src/app/shared/encuesta.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {

  respondioEncuesta : boolean = true;

  constructor(private encuestaService : EncuestaService) { 
    this.encuestaService.getEncuesta().then(res => {
      this.respondioEncuesta = res != null;
    });
  }

  ngOnInit(): void {
  }

}
