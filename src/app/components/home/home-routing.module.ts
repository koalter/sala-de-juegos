import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { HomeComponent } from './home.component';
import { MayorOMenorComponent } from './mayor-o-menor/mayor-o-menor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
