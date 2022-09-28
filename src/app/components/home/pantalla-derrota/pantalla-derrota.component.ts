import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'pantalla-derrota',
  templateUrl: './pantalla-derrota.component.html',
  styleUrls: ['./pantalla-derrota.component.scss']
})
export class PantallaDerrotaComponent implements OnInit {

  @Output() reintentar : EventEmitter<void> = new EventEmitter<void>();
  @Input() flag : boolean;

  constructor() { }

  ngOnInit(): void {
  }

  manejador_reintentar() : void {
    this.reintentar.emit();
  }

}
