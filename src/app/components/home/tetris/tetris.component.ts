import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TetrisService } from 'src/app/shared/tetris.service';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss']
})
export class TetrisComponent implements OnInit, OnDestroy {

  instrucciones : boolean = true;
  ganaste : boolean = false;
  perdiste : boolean = false;
  intervalo : number;
  puntos : number = 0;
  puntosSubscriber$ : Subscription;
  
  canvas2dContext : CanvasRenderingContext2D | null;

  constructor(private service : TetrisService) { 
  }
  
  ngOnInit(): void {
    this.puntosSubscriber$ = this.service.obtenerPuntos().subscribe(puntos => {
      this.puntos = puntos;
    })
  }

  ngOnDestroy(): void {
    this.puntosSubscriber$.unsubscribe();
  }

  iniciarRenderizado(canvas : HTMLCanvasElement) {
    this.instrucciones = false;
    this.perdiste = false;
    this.canvas2dContext = canvas.getContext('2d');
    this.intervalo = Date.now();

    if (this.canvas2dContext) {
      this.canvas2dContext.canvas.height = this.canvas2dContext.canvas.width * 2;
      this.service.mappearTabla(this.canvas2dContext);
      this.service.nuevaFigura(this.canvas2dContext);
      this.automatizarMovimiento();
    }
  }

  moverIzquierda(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.service.moverFiguraIzquierda(context);
    }
  }

  moverDerecha(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.service.moverFiguraDerecha(context);
    }
  }

  moverAbajo(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      try {
        this.service.moverFiguraAbajo(context);
      } catch (error) {
        this.perdiste = true;
      }
    }
  }

  girar(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.service.girarFigura(context);
    }
  }

  tirar(context : CanvasRenderingContext2D | null) {
    if (context) {
      try {
        while (this.service.moverFiguraAbajo(context)) {}
      } catch (err) {
        this.perdiste = true;
      }
    }
  }

  automatizarMovimiento() : void {
    let ahora = Date.now();

    if (ahora - this.intervalo > 990) 
    {
        this.moverAbajo(this.canvas2dContext);
        this.intervalo = Date.now();
    }

    if(!this.perdiste)
    {
        requestAnimationFrame(() => this.automatizarMovimiento());
    }
}

}
