import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../../models/Encuesta';
import { EncuestaService } from '../../../shared/encuesta.service';

@Component({
  selector: 'app-encuesta-listado',
  templateUrl: './encuesta-listado.component.html',
  styleUrls: ['./encuesta-listado.component.scss']
})
export class EncuestaListadoComponent implements OnInit {

  encuestas : Encuesta[];
  encuestaSeleccionada : Encuesta;

  constructor(private encuestaService : EncuestaService) { }

  ngOnInit(): void {
    this.encuestaService.traerTodas()
    .then(res => {
      this.encuestas = res;
    });
  }

  seleccionar(data : Encuesta) {
    this.encuestaSeleccionada = data;
  }
}
