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

    this.canvas2dContext = canvas.getContext('2d');
    console.log(this.canvas2dContext);

    if (this.canvas2dContext) {
      this.canvas2dContext.canvas.height = this.canvas2dContext.canvas.width * 2;
      this.renderTabla(this.canvas2dContext);
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

  renderTabla(context : CanvasRenderingContext2D) : void {
    this.mapping = [];
    for (let fila = 0; fila < 20; fila++) {
      this.mapping.push([]);
      for (let columna = 0; columna < 10; columna++) {
        this.mapping[fila].push('');
        this.renderCuadro(context, columna, fila, 'transparent')
      }
    }
  }

  renderFigura(context : CanvasRenderingContext2D, figura : Tetromino, clear : boolean = false) : void {
    const coordenadasActivas = figura.coordenadas[figura.posicion];
    
    for (let fila = 0; fila < coordenadasActivas.length; fila++) {
      for (let columna = 0; columna < coordenadasActivas[fila].length; columna++) {
        if (coordenadasActivas[fila][columna]) {
          if (clear) {
            this.limpiarCuadro(context, figura.ejeX + columna, figura.ejeY + fila);
          } else {
            this.renderCuadro(context, figura.ejeX + columna, figura.ejeY + fila, figura.color);
          } 
        }
      }
    }
  }
  
  private renderCuadro(context : CanvasRenderingContext2D, ejeX : number, ejeY : number, color : string) : void {
    const width = context.canvas.width * 0.1;
    const height = context.canvas.height * 0.05;

    context.fillStyle = color;
    context.fillRect(ejeX*width, ejeY*height, width, height);
    // context.strokeStyle = "black";
    // context.strokeRect(ejeX*width, ejeY*height, width, height);
  }

  private limpiarCuadro(context : CanvasRenderingContext2D, ejeX : number, ejeY : number) : void {
    const width = context.canvas.width * 0.1;
    const height = context.canvas.height * 0.05;

    context.clearRect(ejeX*width, ejeY*height, width, height);
  }

  moverFiguraAbajo(context : CanvasRenderingContext2D, figura : Tetromino) {
    if (!this.detectarColision(context, figura, 0, 1)) {
      this.renderFigura(context, figura, true);
      figura.ejeY++;
      this.renderFigura(context, figura);
    } else {
      this.fijar();
      this.limpiarFilas();
      this.nuevaFigura(context);
    }
  }

  moverFiguraIzquierda(context : CanvasRenderingContext2D, figura : Tetromino) {
    if (!this.detectarColision(context, figura, -1, 0)) {
      this.renderFigura(context, figura, true);
      figura.ejeX--;
      this.renderFigura(context, figura);
    }
  }

  moverFiguraDerecha(context : CanvasRenderingContext2D, figura : Tetromino) {
    if (!this.detectarColision(context, figura, 1, 0)) {
      this.renderFigura(context, figura, true);
      figura.ejeX++;
      this.renderFigura(context, figura);
    }
  }

  detectarColision(context : CanvasRenderingContext2D, figura : Tetromino, offsetX : number, offsetY : number) : boolean {
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

  private limpiarFilas() : void {
    for (let fila = this.mapping.length - 1; fila > 0; fila--) {
      if (this.mapping[fila].every(celda => celda)) { 
        this.mapping[fila].fill('');
      }
      if (this.mapping[fila].every(celda => !celda)) {
        let temp = (this.mapping[fila-1] as any[]).map(e => e);
        this.mapping[fila-1] = this.mapping[fila];
        this.mapping[fila] = temp;
      }
    }
    console.log(this.mapping);
  }

  girarFigura(context : CanvasRenderingContext2D, figura : Tetromino) {
    this.renderFigura(context, figura, true);
    if (figura.posicion >= figura.coordenadas.length - 1) {
      figura.posicion = 0;
    } else {
      figura.posicion++;
    }
    this.renderFigura(context, figura);
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

}
