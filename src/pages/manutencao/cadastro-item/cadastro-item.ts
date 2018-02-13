import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { PecaServicoProvider } from '../../../providers/peca-servico/peca-servico';
import { PecaServico } from '../../../model/pecaServico';
import { ItemManutencao } from '../../../model/itemManutencao';
import { PosicaoItem } from '../../../model/posicaoItem';
import { Mask } from '../../../utils/mask/mask';


@IonicPage()
@Component({
  selector: 'page-cadastro-item',
  templateUrl: 'cadastro-item.html',
})
export class CadastroItemPage {
  valorUnitario: string;
  item : ItemManutencao;
  carro: boolean;
  pneu: boolean;
  suspensao: boolean;
  dianteiroEsquerdo : boolean;
  traseiroEsquerdo : boolean;
  dianteiroDireito : boolean;
  traseiroDireito : boolean;
  estepe : boolean;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private mask : Mask
  ) {
    this.item = navParams.get('item');
    this.carro = navParams.get('carro');
    this.carregarCategoria(this.item.pecaServico.codigo);
    this.item.quantidade = this.item.quantidade == null && (this.pneu || this.suspensao) ? 0 : this.item.quantidade;
    this.setarPosicoesPagina();
    if(this.item.valorUnitario){
      ;
      this.valorUnitario = mask.gerarValorMonetario(mask.converterParaString(this.item.valorUnitario));
    }
  }


  carregarCategoria(categoria){
      this.pneu = categoria == 5;
      this.suspensao = categoria == 6;
  }

  setarPosicoesPagina(){
    this.dianteiroEsquerdo = false;
    this.traseiroEsquerdo = false;
    this.dianteiroDireito = false;
    this.traseiroDireito = false;
    this.estepe = false;
    if(this.item.posicoes){
      this.item.posicoes.forEach(pos =>{
          if("dianteiroEsquerdo" == pos.posicao){
            this.dianteiroEsquerdo = true;
          }else if("traseiroEsquerdo" == pos.posicao){
            this.traseiroEsquerdo = true;
          }else if("dianteiroDireito" == pos.posicao){
            this.dianteiroDireito = true;
          }else if("traseiroDireito" == pos.posicao){
            this.traseiroDireito = true;
          }else if("estepe" == pos.posicao){
            this.estepe = true;
          }
      });
    }
  }

  setarPosicoesItem(){
    var count = 0;
    var posicoes = Array<PosicaoItem>();
    if(this.dianteiroEsquerdo){
      var pos = new PosicaoItem(null,"dianteiroEsquerdo");
      posicoes.push(pos);
    }
     if(this.traseiroEsquerdo){
      var pos = new PosicaoItem(null,"traseiroEsquerdo");
      posicoes.push(pos);
    }if(this.dianteiroDireito){
      var pos = new PosicaoItem(null,"dianteiroDireito");
      posicoes.push(pos);
    }
    if(this.traseiroDireito){
      var pos = new PosicaoItem(null,"traseiroDireito");
      posicoes.push(pos);
    }
    if(this.estepe){
      var pos = new PosicaoItem(null,"estepe");
      posicoes.push(pos);
    }
    this.item.posicoes = posicoes;
  }

  calculaQuantidade(adiciona){
    this.item.quantidade = adiciona ? this.item.quantidade +1 : this.item.quantidade -1;
  }
  aplicarMascaraValor(valor) {
    this.valorUnitario = this.mask.gerarValorMonetario(valor);
  }
  inserir(){
    this.setarPosicoesItem();
    this.item.valorUnitario = this.mask.converterParaNumero(this.valorUnitario);
    this.viewCtrl.dismiss(this.item);
  }
  fecharModal(){
    this.viewCtrl.dismiss();
  }
  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }
}
