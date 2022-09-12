import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @Output() setUsuario: EventEmitter<any> = new EventEmitter<any>();
  correo: string = '';
  nombre: string = '';
  clave: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  enviarCredenciales() {
    this.setUsuario.emit({ correo: this.correo, clave: this.clave, nombre: this.nombre });
  }


}
