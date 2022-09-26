import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/shared/chat.service';

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  @Output() toggle : EventEmitter<void> = new EventEmitter<void>();
  mensaje : string = '';

  constructor(public chatService : ChatService) { }

  ngOnInit(): void {
  }

  cerrarChat() {
    this.toggle.emit();
  }

  enviarMensaje() : void {
    if (this.mensaje) {
      this.chatService.agregarMensaje(this.mensaje);
      this.mensaje = '';
    }
  }

  onKeyDownHandler(event : KeyboardEvent) : void {
    if (event.key === 'Enter') {
      this.enviarMensaje();
    }
  }

  getTime() : string {
    return new Date(Date.now()).toLocaleTimeString();
  }
}
