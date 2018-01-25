import { Marca } from './marca';

export class Modelo {
    constructor(
        public codigo: number,
        public nome: string,
        public marca: Marca,
        public ano: number) {

        }
}
