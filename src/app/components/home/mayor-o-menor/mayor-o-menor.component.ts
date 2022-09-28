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
  valorSiguiente : number = 0;
  puntos : number = 0;

  mazo : {} = {
    indice: 0,
    naipes: []
  };

  constructor() { }

  ngOnInit(): void {
    this.mazo["naipes"] = this.llenarMazo();
    this.mazo["indice"] = 0;
    this.valorActual = this.mazo["naipes"][this.mazo["indice"]];
    this.mazo["indice"]++;
    this.perdiste = false;
    this.puntos = 0;
  }

  private llenarMazo() : number[] {
    const arr : number[] = []
    for (let i = 1; i <= 20 ; i++) {
      arr.push(i);
    }
    return this.mezclar(arr);
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

  verTarjeta(obj : HTMLElement, criterio : string) {
    this.valorSiguiente = this.mazo["naipes"][this.mazo["indice"]];
    obj.style.transform = 'rotateY(180deg)';
    
    setTimeout(() => {
      obj.style.transform = '';
      switch (criterio) {
        case 'mayor':
          if (this.valorSiguiente < this.valorActual) {
            this.perdiste = true;
            return;
          }
          break;
        case 'menor':
          if (this.valorSiguiente > this.valorActual) {
            this.perdiste = true;
            return;
          }
          break;
        default:
          this.perdiste = true;
          return;  
      }

      this.puntos++;
      this.valorActual = this.valorSiguiente;
      
      if (this.mazo["indice"] === this.mazo["naipes"].length - 1) {
        this.mazo["indice"] = 0;
        this.mazo["naipes"] = this.mezclar(this.mazo["naipes"]);
      } else {
        this.mazo["indice"]++;
      }
    }, 1500);
    
  }
}
