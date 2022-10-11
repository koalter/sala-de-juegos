import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuestaListadoComponent } from './encuesta-listado/encuesta-listado.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { HomeComponent } from './home.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';
import { TetrisComponent } from './tetris/tetris.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { EncuestaGuard } from 'src/app/guards/encuesta.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: BienvenidoComponent
      },
      {
        path: 'ahorcado',
        component: AhorcadoComponent
      },
      {
        path: 'mayor-o-menor',
        component: MayorOMenorComponent
      },
      {
        path: 'consultados',
        component: PreguntadosComponent
      },
      {
        path: 'tetris',
        component: TetrisComponent
      },
      {
        path: 'encuesta',
        component: EncuestaComponent,
        canActivate: [EncuestaGuard]
      },
      {
        path: 'encuesta/listado',
        component: EncuestaListadoComponent,
        canActivate: [AdminGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
