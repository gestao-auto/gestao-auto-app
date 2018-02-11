import { PosicaoItem } from './posicaoItem';
import { PecaServico } from './pecaServico'

export class ItemManutencao {
    constructor(
        public codigo: number,
        public valorUnitario: number,
        public quantidade: number,
        public observacao: string,
        public pecaServico: PecaServico,
        public posicoes: Array<PosicaoItem>
    ) {}
}
