import { Component, OnInit } from '@angular/core';
import { Tetromino, TetrominoFactory } from '../../../models/Tetromino';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit {

  instrucciones : boolean = true;
  ganaste : boolean = false;
  perdiste : boolean = false;
  
  canvas2dContext : CanvasRenderingContext2D | null;

  constructor() { }

  ngOnInit(): void {
  }

  iniciarRenderizado(canvas : HTMLCanvasElement) {
    this.instrucciones = false;
    this.perdiste = false;
    this.canvas2dContext = canvas.getContext('2d');

    if (this.canvas2dContext) {
      this.canvas2dContext.canvas.height = this.canvas2dContext.canvas.width * 2;
      this.mappearTabla(this.canvas2dContext);
      this.nuevaFigura(this.canvas2dContext);
    }
  }

  //metodos a mover a un service
  figura : Tetromino;
  tiempo : number;
  mapping : any[];

  nuevaFigura(context : CanvasRenderingContext2D) : void {
    this.figura = TetrominoFactory.instanciar();
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

  moverFiguraAbajo(context : CanvasRenderingContext2D, figura : Tetromino) : boolean {
    let result : boolean = false;
    if (!this.detectarColision(figura, 0, 1)) {
      result = true;
      this.renderFigura(context, figura, true);
      figura.ejeY++;
      this.renderFigura(context, figura);
    } else {
      this.fijar();
      if (this.limpiarFilas()) {
        this.renderTabla(context);
      }
      this.nuevaFigura(context);
    }

    return result;
  }

  moverFiguraIzquierda(context : CanvasRenderingContext2D, figura : Tetromino) {
    if (!this.detectarColision(figura, -1, 0)) {
      this.renderFigura(context, figura, true);
      figura.ejeX--;
      this.renderFigura(context, figura);
    }
  }

  moverFiguraDerecha(context : CanvasRenderingContext2D, figura : Tetromino) {
    if (!this.detectarColision(figura, 1, 0)) {
      this.renderFigura(context, figura, true);
      figura.ejeX++;
      this.renderFigura(context, figura);
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
          if (this.figura.ejeY + fila < 0) {
            this.perdiste = true;
            return;
          }
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
        // sumar puntos
        this.mapping.splice(fila, 1);
        this.mapping.unshift(['', '', '', '', '', '', '', '', '', '']);
      }
    }

    return resultado;
  }

  girarFigura(context : CanvasRenderingContext2D, figura : Tetromino) {
    let posicionActual = figura.posicion;
    let ejeXActual = figura.ejeX;
    let nuevoEjeX : number = figura.ejeX;
    figura.posicion = (figura.posicion + 1) % figura.coordenadas.length;
    
    if (this.detectarColision(figura, 0, 0)) {
      if (figura.ejeX > 10/2) {
        figura.ejeX -= 1;
      } else {
        figura.ejeX = 0;
      }
      nuevoEjeX = figura.ejeX;
    }
    if (!this.detectarColision(figura, 0, 0)) {
      figura.ejeX = ejeXActual;
      figura.posicion = posicionActual;
      this.renderFigura(context, figura, true);
      figura.ejeX = nuevoEjeX;
      figura.posicion = (figura.posicion + 1) % figura.coordenadas.length;
      this.renderFigura(context, figura);
    } else {
      figura.posicion = posicionActual;
      figura.ejeX = ejeXActual;
    }
    
  }

  moverIzquierda(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.moverFiguraIzquierda(context, this.figura);
    }
  }

  moverDerecha(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.moverFiguraDerecha(context, this.figura);
    }
  }

  moverAbajo(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.moverFiguraAbajo(context, this.figura);
    }
  }

  girar(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.girarFigura(context, this.figura);
    }
  }

  tirar(context : CanvasRenderingContext2D | null) {
    if (context) {
      while (this.moverFiguraAbajo(context, this.figura)) {}
    }
  }

}
