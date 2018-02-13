import { ItemManutencao } from './itemManutencao';
import { Mask } from '../utils/mask/mask';
export class Manutencao {
    constructor(
        public tipoManutencao: string,
        public codigo: number,
        public descricao: string,
        public codigoReparador: number,
        public nomeReparador: string,
        public codigoSeguradora: number,
        public nomeSeguradora: string,
        public codigoVeiculo: number,
        public odometro: number,
        public data: string,
        public status: string,
        public dataPrevista: string,
        public odometroPrevisto: number,
        public motivo: string,
        public itensManutencao: Array<ItemManutencao>,
        public valorTotal: string
    ) {}
}
