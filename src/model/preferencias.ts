export class Preferencias {
    constructor(
        public codigo: number,
        public codigoUsuario: number,
        public horarioNotificacao: string,
        public diasAntecedenciaNotificacaoRevisao: number,
        public hodometroAntecedenciaNotificacaoRevisao: number
    ) {}
}
