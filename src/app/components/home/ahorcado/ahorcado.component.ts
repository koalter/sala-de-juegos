import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  palabra : string[] = [];
  palabraOculta : string[] = [];
  vida : number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit(): void {
    const res = 'CIRCUNFERENCIA';
    this.palabraOculta = res.split('');
    this.palabra = this.palabraOculta.map(v => v).fill('_');
  }

  seleccionarLetra(ev) {
    ev.target.disabled = true;
    const char = ev.target.childNodes[0].textContent;
    let indices : number[] = [];
    let existe = false;

    for (let i = 0; i < this.palabraOculta.length; i++) {
      if (this.palabraOculta[i] === char) {
        indices.push(i);
        existe = true;
      }
    }

    for (let num of indices) {
      this.palabra.splice(num, 1, char);
    }

    if (!existe) {
      this.vida.pop();
    }
  }
}
