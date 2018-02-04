import { Modelo } from './modelo';

export class Veiculo {
    constructor(
        public codigo: number,
        public nome: string,
        public modelo: Modelo,
        public placa: string,
        public ano: string,
        public modalidade: string,
        public renavam: string,
        public odometro: number,
        public proprietario: number,
        public dataAquisicao : string,
        public dataAquisicaoPrimeiroDono : string,
        public unicoDono : boolean
        ) {}
}
