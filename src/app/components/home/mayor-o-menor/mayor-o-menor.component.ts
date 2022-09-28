import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mayor-o-menor',
  templateUrl: './mayor-o-menor.component.html',
  styleUrls: ['./mayor-o-menor.component.scss']
})
export class MayorOMenorComponent implements OnInit {

  instrucciones : boolean = true;
  ganaste : boolean = false;
  perdiste : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.instrucciones = false;
  }

}
