export class Manutencao {
    constructor(
        public tipoManutencao: string,
        public codigo: number,
        public descricao: string,
        public codigoReparador: number,
        public codigoSeguradora: number,
        public codigoVeiculo: number,
        public odometro: number,
        public data: string,
        public status: string,
        public dataPrevista: string,
        public odometroPrevisto: number,
        public motivo: string
    ) {}
}
