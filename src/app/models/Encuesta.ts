export class Encuesta {
    usuario : string;
    nombre : string;
    apellido : string;
    edad : number;
    telefono : number;
    fecha : Date;
    juegoPreferido : string;
    recomienda : boolean;
    puntajeJuegoPropio : number;

    constructor(usuario : string, nombre : string, apellido : string, edad : number, telefono : number, fecha : Date,
        juegoPreferido : string, recomienda : boolean, puntajeJuegoPropio : number) {
        
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.fecha = fecha;
        this.juegoPreferido = juegoPreferido;
        this.recomienda = recomienda;
        this.puntajeJuegoPropio = puntajeJuegoPropio;
    }
}
