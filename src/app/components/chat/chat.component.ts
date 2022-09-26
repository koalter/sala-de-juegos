import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  nuevosMensajes : boolean = true;
  toggleChat : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  abrirChat() : void {
    this.nuevosMensajes = false;
    this.toggleChat = true;
  }
}
