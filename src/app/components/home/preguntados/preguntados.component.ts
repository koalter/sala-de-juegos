import { Component, OnInit } from '@angular/core';
import { Preguntados } from '../../../models/Preguntados';
import { PreguntadosService } from '../../../shared/preguntados.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  cargarSpinner : boolean = false;
  instrucciones : boolean = true;
  ganaste : boolean = false;
  perdiste : boolean = false;
  pregunta : Preguntados;
  imagenPregunta : string = "";

  constructor(private service : PreguntadosService) { }

  ngOnInit(): void {
  }

  comenzar() {
    this.instrucciones = false;
    if (!this.pregunta) {
      this.generarPregunta();
    }
  }

  generarPregunta() {
    this.cargarSpinner = true;
    this.ganaste = false;
    this.perdiste = false;

    this.service.generarPregunta()
    .then(res => {
      this.pregunta = res;
      this.service.obtenerImagen(res.imagen)
      .then(foto => this.imagenPregunta = foto);
    })
    .catch(err => console.log(err))
    .finally(() => this.cargarSpinner = false);
  }

  responder(index : number) {
    if (this.pregunta.respuestas[index].solucion) {
      this.ganaste = true;
    } else {
      this.perdiste = true;
    }
  }

}
