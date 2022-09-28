import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pantalla-victoria',
  templateUrl: './pantalla-victoria.component.html',
  styleUrls: ['./pantalla-victoria.component.scss']
})
export class PantallaVictoriaComponent implements OnInit {

  @Output() reintentar : EventEmitter<void> = new EventEmitter<void>();
  @Input() flag : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  manejador_reintentar() : void {
    this.reintentar.emit();
  }

}
