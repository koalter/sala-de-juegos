import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AuthErroresComponent } from '../auth-errores/auth-errores.component';
import { FormsModule } from '@angular/forms';
import { ChatModule } from '../chat/chat.module';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent,
    SpinnerComponent,
    AuthErroresComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatModule
  ]
})
export class HomeModule { }
