import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthErroresComponent } from '../auth-errores/auth-errores.component';
import { FormsModule } from '@angular/forms';
import { ChatModule } from '../chat/chat.module';

import { HomeRoutingModule } from './home-routing.module';
import { JuegosComponent } from './juegos/juegos.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    SpinnerComponent,
    AuthErroresComponent,
    JuegosComponent,
    BienvenidoComponent,
    AhorcadoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ChatModule
  ]
})
export class HomeModule { }
