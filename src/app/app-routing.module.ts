import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'quien-soy',
    component: QuienSoyComponent
  },
  {
    path: 'about',
    redirectTo: 'quien-soy',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
