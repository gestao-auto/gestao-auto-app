export class HomeManutencao {
    constructor(
        public codigo: number,
        public descricao: string,
        public codigoVeiculo: number,
        public status: string,
        public quilometragemPrevista : number,
        public tempoUsoPrevisto : string,
        public diasRestantes: number,
        public quilometrosRestantes: number,
        public valorMedio : string
    ) {}
}
