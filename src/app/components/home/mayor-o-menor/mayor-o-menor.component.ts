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
  valorActual : number = 0;
  valorSiguiente : number = 1;

  mazo : number[] = this.llenarMazo();

  constructor() { }

  ngOnInit(): void {
    this.mazo = this.mezclar(this.mazo);
  }

  private llenarMazo() : number[] {
    return [
      1,2,3,4,5,6,7,8,9,10,11,12,13,
      1,2,3,4,5,6,7,8,9,10,11,12,13,
      1,2,3,4,5,6,7,8,9,10,11,12,13,
      1,2,3,4,5,6,7,8,9,10,11,12,13
    ];
  }

  private mezclar(arr : number[]) {
    let count = arr.length, temp, index;

    while(count > 0) {
        index = Math.floor(Math.random() * count);
        count--;

        temp = arr[count];
        arr[count] = arr[index];
        arr[index] = temp;
    }

    return arr;
  }
}
