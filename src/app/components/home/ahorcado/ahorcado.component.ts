import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { ResultadosService } from 'src/app/shared/resultados.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  palabras : string[] = ['CIRCUNFERENCIA', 'ESQUELETO', 'QUIMICA', 'VERDURA', 'COMENSAL'];
  palabra : string[] = [];
  palabraOculta : string[] = [];
  vida : any[] = [1, 2, 3, 4, 5, 6, 7];
  perdiste : boolean = false;
  ganaste : boolean = false;
  instrucciones : boolean = true;
  keys : any[] = [];

  tempFecha : string = formatDate(new Date(), 'dd-MM-YYYY h:mm a', 'en-US');

  resultados : any[] = [];
  constructor(private resultadosService : ResultadosService,
    private usuarioService : UsuarioService) { }

  ngOnInit(): void {
    const res : string = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = res.split('');
    this.palabra = this.palabraOculta.map(v => v).fill('_');
    this.ganaste = false;
    this.perdiste = false;
    this.vida = [1, 2, 3, 4, 5, 6, 7];

    if (this.keys.length > 0) {
      for (let key of this.keys) {
        key.disabled = false;
      }
    }
    this.obtenerResultados();
  }

  obtenerResultados() : void {
    try {
      const usuario : User | null = this.usuarioService.obtenerUsuario();
      const username = usuario?.displayName || usuario?.email;
  
      if (username) {
        this.resultadosService.getResultados('ahorcado', username)
        .then(res => this.resultados = res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  seleccionarLetra(ev) {
    this.keys.push(ev.target);
    ev.target.disabled = true;
    const char = ev.target.childNodes[0].textContent;
    let indices : number[] = [];
    let existe = false;

    for (let i = 0; i < this.palabraOculta.length; i++) {
      if (this.palabraOculta[i] === char) {
        indices.push(i);
        existe = true;
      }
    }

    for (let num of indices) {
      this.palabra.splice(num, 1, char);
    }

    if (!existe) {
      this.vida.pop();
    }
    
    if (this.vida.length <= 0) {
      this.perdiste = true;
    }

    if (this.palabra.toString() === this.palabraOculta.toString()) {
      this.ganaste = true;
    }
  }
}
