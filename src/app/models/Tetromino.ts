class Pieza {
    coordenadas : any[];
    color : string;

    protected constructor(coordenadas : any[], color : string) {
        this.coordenadas = coordenadas;
        this.color = color;
    }

    static T = {
        coordenadas: [
            [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
            [[0, 1, 0], [1, 1, 0], [0, 1, 0]],
            [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 0]]
        ],
        color: "purple"
    } as Pieza;

    static Z = {
        coordenadas: [
            [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
            [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
            [[0, 1, 0], [1, 1, 0], [1, 0, 0]]
        ],
        color: "red"
    } as Pieza;

    static S = {
        coordenadas: [
            [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 0], [0, 1, 0]]
        ],
        color: "green"
    } as Pieza;

    static L = {
        coordenadas: [
            [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
            [[1, 1, 0], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 1], [1, 1, 1], [0, 0, 0]]
        ],
        color: "orange"
    } as Pieza;

    static J = {
        coordenadas: [
            [[0, 1, 0], [0, 1, 0], [1, 1, 0]],
            [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 0, 1]]
        ],
        color: "indigo"
    } as Pieza;

    static O = {
        coordenadas: [
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]],
            [[1, 1], [1, 1]]
        ],
        color: "yellow"
    } as Pieza;

    static I = {
        coordenadas: [
            [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]],
            [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]]
        ],
        color: "cyan"
    } as Pieza;

}

export class Tetromino extends Pieza {
    posicion : number;
    ejeX : number;
    ejeY : number;

    protected constructor(pieza : Pieza) {
        super(pieza.coordenadas, pieza.color);
        
        this.posicion = 0;
        this.ejeX = 3;
        this.ejeY = -2;
    }
}

export class TetrominoFactory extends Tetromino {
    
    private static coleccion = [
        Pieza.T,
        Pieza.I,
        Pieza.J,
        Pieza.L,
        Pieza.O,
        Pieza.S,
        Pieza.Z
    ];

    static instanciar() : Tetromino {
        const index = Math.floor(Math.random() * this.coleccion.length);
        return new Tetromino(this.coleccion[index]);
    }
}

