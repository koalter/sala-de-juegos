import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectLoggedInTo('home'))
  },
  {
    path: 'home',
    component: HomeComponent,
    ...canActivate(() => redirectUnauthorizedTo('login'))
  },
  {
    path: 'quien-soy',
    component: QuienSoyComponent
  },
  {
    path: 'about',
    redirectTo: 'quien-soy',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
