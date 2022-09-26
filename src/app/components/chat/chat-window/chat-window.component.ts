import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ChatLog } from 'src/app/models/ChatLog';
import { ChatService } from 'src/app/shared/chat.service';
import { UsuarioService } from 'src/app/shared/usuario.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Output() toggle : EventEmitter<number> = new EventEmitter<number>();
  @Output() mensajero : EventEmitter<ChatLog> = new EventEmitter<ChatLog>();
  @Input() mensajes : ChatLog[];
  mensaje : string = '';

  constructor(private auth : Auth) { }

  ngOnInit(): void {
  }

  cerrarChat() {
    this.toggle.emit(this.mensajes.length);
  }

  enviarMensaje() : void {
    if (this.mensaje) {
      const usuario = this.auth.currentUser;
      if (usuario) {
        const log = new ChatLog(this.mensaje, usuario.email, new Date(Date.now()));
        this.mensajero.emit(log);
        this.mensaje = '';
      }
    }
  }

  onKeyDownHandler(event : KeyboardEvent) : void {
    if (event.key === 'Enter') {
      this.enviarMensaje();
    }
  }

  getNombreDeUsuario() {
    return this.auth.currentUser?.email;
  }

}
