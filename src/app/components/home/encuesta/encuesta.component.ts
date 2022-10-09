import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorEdad } from 'src/app/shared/edad.validator';
import { EncuestaService } from 'src/app/shared/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  formulario : FormGroup;
  cargarSpinner : boolean = false;
  encuestaEnviada : boolean = false;

  constructor(private encuestaService : EncuestaService) { 
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, ValidatorEdad]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]),
      pregunta_1: new FormControl('', Validators.required),
      pregunta_2: new FormControl('', Validators.required),
      pregunta_3: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  async enviar() {
    if (this.formulario.valid) {
      this.cargarSpinner = true;

      try {
        const encuesta = {
          nombre: this.formulario.get('nombre')?.value,
          apellido: this.formulario.get('apellido')?.value,
          edad: this.formulario.get('edad')?.value,
          telefono: this.formulario.get('telefono')?.value,
          juegoPreferido: this.formulario.get('pregunta_1')?.value,
          recomienda: this.formulario.get('pregunta_2')?.value,
          puntajeJuegoPropio: this.formulario.get('pregunta_3')?.value
        }
        await this.encuestaService.enviarEncuesta(encuesta);
      } catch (error) {
        console.error(error);
      } finally {
        this.cargarSpinner = false;
        this.encuestaEnviada = true;
      }
    }
  }

  validarNumero(event : KeyboardEvent) : void {
    if (isNaN(parseInt(event.key)) && event.key != 'Backspace' && event.key != 'Tab' && !event.key.includes('Arrow')) {
      event.preventDefault();
    }
  }
}
