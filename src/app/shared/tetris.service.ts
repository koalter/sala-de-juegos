import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Tetromino, TetrominoFactory } from '../models/Tetromino';

@Injectable({
  providedIn: 'root'
})
export class TetrisService {

  figura : Tetromino;
  mapping : any[];
  puntos : number = 0;
  puntos$ = new Subject<number>();
  
  constructor() { }

  reiniciarPuntos() : void {
    this.puntos = 0;
    this.puntos$.next(this.puntos);
  }

  sumarPuntos() : void {
    this.puntos += 10;
    this.puntos$.next(this.puntos);
  }

  obtenerPuntos() : Observable<number> {
    return this.puntos$.asObservable();
  }

  nuevaFigura(context : CanvasRenderingContext2D) : void {
    this.figura = TetrominoFactory.instanciar();
    if (this.detectarColision(this.figura, 0, 0)) {
      throw new Error("El juego terminó");
    } 
    this.renderFigura(context, this.figura);
  }

  mappearTabla(context : CanvasRenderingContext2D) : void {
    this.mapping = [];
    for (let fila = 0; fila < 20; fila++) {
      this.mapping.push([]);
      for (let columna = 0; columna < 10; columna++) {
        this.mapping[fila].push('');
        this.renderCuadro(context, columna, fila, this.mapping[fila][columna]);
      }
    }
  }

  renderTabla(context : CanvasRenderingContext2D) : void {
    for (let fila = 0; fila < 20; fila++) {
      for (let columna = 0; columna < 10; columna++) {
        this.renderCuadro(context, columna, fila, this.mapping[fila][columna]);
      }
    }
  }

  renderFigura(context : CanvasRenderingContext2D, figura : Tetromino, clear : boolean = false) : void {
    const coordenadasActivas = figura.coordenadas[figura.posicion];
    
    for (let fila = 0; fila < coordenadasActivas.length; fila++) {
      for (let columna = 0; columna < coordenadasActivas[fila].length; columna++) {
        if (coordenadasActivas[fila][columna]) {
          if (clear) {
            this.renderCuadro(context, figura.ejeX + columna, figura.ejeY + fila);
          } else {
            this.renderCuadro(context, figura.ejeX + columna, figura.ejeY + fila, figura.color);
          } 
        }
      }
    }
  }
  
  private renderCuadro(context : CanvasRenderingContext2D, ejeX : number, ejeY : number, color : string = '') : void {
    const width = context.canvas.width * 0.1;
    const height = context.canvas.height * 0.05;

    if (color) {
      context.fillStyle = color;
      context.fillRect(ejeX*width, ejeY*height, width, height);
      context.strokeStyle = "black";
      context.strokeRect(ejeX*width, ejeY*height, width, height);
    } else {
      context.clearRect(ejeX*width-1, ejeY*height-1, width+2, height+2);
    }
  }

  moverFiguraAbajo(context : CanvasRenderingContext2D) : boolean {
    let result : boolean = false;
    if (!this.detectarColision(this.figura, 0, 1)) {
      result = true;
      this.renderFigura(context, this.figura, true);
      this.figura.ejeY++;
      this.renderFigura(context, this.figura);
    } else {
      this.fijar();
      if (this.limpiarFilas()) {
        this.renderTabla(context);
      }
      this.nuevaFigura(context);
    }

    return result;
  }

  moverFiguraIzquierda(context : CanvasRenderingContext2D) {
    if (!this.detectarColision(this.figura, -1, 0)) {
      this.renderFigura(context, this.figura, true);
      this.figura.ejeX--;
      this.renderFigura(context, this.figura);
    }
  }

  moverFiguraDerecha(context : CanvasRenderingContext2D) {
    if (!this.detectarColision(this.figura, 1, 0)) {
      this.renderFigura(context, this.figura, true);
      this.figura.ejeX++;
      this.renderFigura(context, this.figura);
    }
  }

  detectarColision(figura : Tetromino, offsetX : number, offsetY : number) : boolean {
    for (let fila = 0; fila < figura.coordenadas[figura.posicion].length; fila++) 
    {
      for (let columna = 0; columna < figura.coordenadas[figura.posicion][fila].length; columna++) 
      {
        if (figura.coordenadas[figura.posicion][fila][columna]) {

          const futuroX = figura.ejeX + columna + offsetX;
          const futuroY = figura.ejeY + fila + offsetY;
          
          if (futuroX < 0 || futuroX >= 10 || futuroY >= 20) {
            return true;
          }
          if (futuroY < 0) { continue; }
          if (this.mapping[futuroY][futuroX]) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private fijar() : void {
    const coordenadasActivas = this.figura.coordenadas[this.figura.posicion];

    for (let fila = 0; fila < coordenadasActivas.length; fila++) {
      for (let columna = 0; columna < coordenadasActivas[fila].length; columna++) {
        if (coordenadasActivas[fila][columna]) {
          this.mapping[this.figura.ejeY + fila][this.figura.ejeX + columna] = this.figura.color;
        }
      }
    }
  }

  private limpiarFilas() : boolean {
    let resultado = false;

    for (let fila = 0; fila < this.mapping.length; fila++) {
      if (this.mapping[fila].every(celda => celda)) { 
        resultado = true;
        this.sumarPuntos();
        
        this.mapping.splice(fila, 1);
        this.mapping.unshift(['', '', '', '', '', '', '', '', '', '']);
      }
    }

    return resultado;
  }

  girarFigura(context : CanvasRenderingContext2D) {
    let posicionActual = this.figura.posicion;
    let ejeXActual = this.figura.ejeX;
    let nuevoEjeX : number = this.figura.ejeX;
    this.figura.posicion = (this.figura.posicion + 1) % this.figura.coordenadas.length;
    
    if (this.detectarColision(this.figura, 0, 0)) {
      if (this.figura.ejeX > 10/2) {
        this.figura.ejeX -= 1;
      } else {
        this.figura.ejeX = 0;
      }
      nuevoEjeX = this.figura.ejeX;
    }
    if (!this.detectarColision(this.figura, 0, 0)) {
      this.figura.ejeX = ejeXActual;
      this.figura.posicion = posicionActual;
      this.renderFigura(context, this.figura, true);
      this.figura.ejeX = nuevoEjeX;
      this.figura.posicion = (this.figura.posicion + 1) % this.figura.coordenadas.length;
      this.renderFigura(context, this.figura);
    } else {
      this.figura.posicion = posicionActual;
      this.figura.ejeX = ejeXActual;
    }
    
  }

}
