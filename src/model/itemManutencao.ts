import { PosicaoItem } from './posicaoItem';

export class ItemManutencao {
    constructor(
        public codigo: number,
        public valorUnitario: number,
        public quantidade: number,
        public observacao: string,
        public posicoes: Array<PosicaoItem>
    ) {}
}
