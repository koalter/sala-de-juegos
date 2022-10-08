import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ResultadosService } from 'src/app/shared/resultados.service';
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
  resultados : any[];
  mostrarResultados : boolean = true;
  tiempo : Date = new Date(180000);
  
  canvas2dContext : CanvasRenderingContext2D | null;

  constructor(private tetrisService : TetrisService,
    private resultadosService : ResultadosService) { 
      this.puntosSubscriber$ = this.tetrisService.obtenerPuntos().subscribe(puntos => {
        this.puntos = puntos;
      });
  }
  
  ngOnInit(): void {
    this.resultadosService.getResultados('tetris')
    .then(res => this.resultados = res);
    
    this.perdiste = false;
    this.tiempo = new Date(180000);
    this.tetrisService.reiniciarPuntos();
  }
  
  ngOnDestroy(): void {
    this.puntosSubscriber$.unsubscribe();
  }
  
  toggleResultados() : void {
    this.mostrarResultados = !this.mostrarResultados;
  }
  
  iniciarRenderizado(canvas : HTMLCanvasElement) {
    this.ngOnInit();
    this.instrucciones = false;
    this.intervalo = Date.now();
    this.canvas2dContext = canvas.getContext('2d');

    if (this.canvas2dContext) {
      this.canvas2dContext.canvas.height = this.canvas2dContext.canvas.width * 2;
      this.tetrisService.mappearTabla(this.canvas2dContext);
      this.tetrisService.nuevaFigura(this.canvas2dContext);
      this.automatizarMovimiento();
    }
  }

  moverIzquierda(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.moverFiguraIzquierda(context);
    }
  }

  moverDerecha(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.moverFiguraDerecha(context);
    }
  }

  moverAbajo(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      try {
        this.tetrisService.moverFiguraAbajo(context);
      } catch (error) {
        this.perdiste = true;
      }
    }
  }

  girar(context : CanvasRenderingContext2D | null) : void {
    if (context) {
      this.tetrisService.girarFigura(context);
    }
  }

  tirar(context : CanvasRenderingContext2D | null) {
    if (context) {
      try {
        while (this.tetrisService.moverFiguraAbajo(context)) {}
      } catch (err) {
        this.perdiste = true;
        this.resultadosService.subirResultados('tetris', { puntos: this.puntos });
      }
    }
  }

  automatizarMovimiento() : void {
    let ahora = Date.now();
    
    if (ahora - this.intervalo > 990) 
    {
      this.tiempo.setSeconds(this.tiempo.getSeconds() - 1);
      this.moverAbajo(this.canvas2dContext);
      this.intervalo = Date.now();

      if (this.tiempo.getTime() === 0) {
        this.perdiste = true;
        this.resultadosService.subirResultados('tetris', { puntos: this.puntos });
      }
    }

    if(!this.perdiste)
    {
      requestAnimationFrame(() => this.automatizarMovimiento());
    }
}

}
