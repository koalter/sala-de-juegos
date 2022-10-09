import { Component, OnInit } from '@angular/core';
import { ResultadosService } from 'src/app/shared/resultados.service';
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
  resultados : any[] = [];

  constructor(private preguntadosService : PreguntadosService,
    private resultadosService : ResultadosService) { }

  ngOnInit(): void {
    this.resultadosService.getResultados('preguntados')
    .then(res => this.resultados = res);

    this.generarPregunta();
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

    this.preguntadosService.generarPregunta()
    .then(res => {
      this.pregunta = res;
      this.preguntadosService.obtenerImagen(res.imagen)
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

    this.resultadosService.subirResultados('preguntados', { victoria: this.pregunta.respuestas[index].solucion });
  }

}
