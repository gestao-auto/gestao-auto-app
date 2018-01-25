import { Modelo } from './modelo';

export class Veiculo {
    constructor(
        public codigo: number,
        public nome: string,
        public modelo: Modelo,
        public placa: string,
        public ano: number,
        public modalidade: string,
        public renavam: string,
        public odometro: number,
        ) {
        }
}
