import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  instrucciones : boolean = false;
  ganaste : boolean = false;
  perdiste : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
