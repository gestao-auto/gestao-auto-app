import { IndicadorGastoIndividualManutencaoItemManuteido } from './indicadorGastoIndividualManutencaoItemManuteido';

export class IndicadorGastoIndividualManutencao {
    constructor(
        public dias : number,
        public registros: number,
        public custoTotal: string,
        public custoPorDia: string,
        public custoPorQuilometragem: string,
        public itensManuteidos : Array<IndicadorGastoIndividualManutencaoItemManuteido>
    ) {}
}
