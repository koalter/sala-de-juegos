export class ChatLog {
    mensaje : string;
    usuario : string|null;
    tiempo : Date;

    constructor(mensaje : string, usuario : string|null, tiempo : Date) {
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.tiempo = tiempo;
    }
}
