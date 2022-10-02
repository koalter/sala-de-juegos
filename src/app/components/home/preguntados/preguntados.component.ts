import { Component, OnInit } from '@angular/core';
import { PreguntadosService } from 'src/app/shared/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  cargarSpinner : boolean = false;
  instrucciones : boolean = false;
  ganaste : boolean = false;
  perdiste : boolean = false;
  pregunta : {};
  imagenPregunta : string = "";

  constructor(private service : PreguntadosService) { }

  ngOnInit(): void {
  }

  generarPregunta(tema : string) {
    this.cargarSpinner = true;
    this.service.generarPregunta(tema)
    .then(res => {
      this.pregunta = res;
      this.service.obtenerImagen(res["imagen"])
      .then(foto => this.imagenPregunta = foto);
    })
    .catch(err => console.log(err))
    .finally(() => this.cargarSpinner = false);
  }

}
