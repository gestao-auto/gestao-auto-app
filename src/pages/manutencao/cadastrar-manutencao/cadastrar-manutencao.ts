import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';
import { JwtHelper } from "angular2-jwt";
import { Mask } from '../../../utils/mask/mask';
import { Manutencao } from '../../../model/manutencao';
import { ItemManutencao } from '../../../model/itemManutencao';
import { PecaServico } from '../../../model/pecaServico';
import { PecaServicoProvider } from '../../../providers/peca-servico/peca-servico';

@IonicPage()
@Component({
  selector: 'page-cadastrar-manutencao',
  templateUrl: 'cadastrar-manutencao.html',
})
export class CadastrarManutencaoPage {
  veiculoSelecionado: any;
  fixoRevisao: boolean;
  manutencao: Manutencao;
  codigoUsuario: string;
  jwtHelper = new JwtHelper();
  nomeReparador: string;
  listaPecas: Array<PecaServico>;
  categoria: PecaServico;
  valorTotal: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private storage: Storage,
    private manutencaoProvider: ManutencaoProvider,
    private psProvider: PecaServicoProvider,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private mask: Mask) {
    this.getPecasServicos();
    this.fixoRevisao = false;
    this.codigoUsuario = "";

    this.manutencao = this.navParams.get('manutencao');
    this.manutencao = (this.manutencao == null) ? new Manutencao(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null) : this.manutencao;
    this.fixoRevisao = this.isFixedRevision();
    if (this.fromHome()) {
      console.log('CadastrarManutencaoPage - fromHome');
      this.manutencaoProvider.get(this.manutencao.codigo)
        .then((manutencao: Manutencao) => {
          this.manutencao = (manutencao != null) ? manutencao : new Manutencao(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,null);
          this.fixoRevisao = this.isFixedRevision();
        }, (error) => {
          this.tratarErro(error);
        })
    }
    if(!this.manutencao.itensManutencao){
      this.manutencao.itensManutencao = Array<ItemManutencao>();
    }
    this.storage.get('token').then(
      token => {
        this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
      });
    this.storage.get('veiculo').then(
      veiculo => {
        if (veiculo == null) {
          this.veiculoSelecionado = (veiculo == null) ? this.veiculoSelecionado : veiculo;
          this.mostrarToast("Não há veículos cadastrados, cadastre um veículo antes de prosseguir.");
        } else {
          this.veiculoSelecionado = veiculo;
        }
      });
      this.calcularValorTotal();
  }

  private fromHome() {
    return this.manutencao != null && this.manutencao.hasOwnProperty('diasRestantes');
  }

  private isFixedRevision() {
    return this.manutencao != null && this.manutencao['tipoManutencao'] == 'REVISAO';
  }

  aplicarMascara(campo, valor, mascara) {
    this.manutencao[campo] = this.mask.atualizarValor(valor, mascara);
  }

  salvar() {
    this.manutencao.valorTotal = '0';
    (this.manutencao.codigo != null && this.manutencao.codigo != 0)
      ? this.alterar() : this.adicionar();
  }

  alterar() {
    this.manutencaoProvider.update(this.manutencao)
      .then((manutencao: any) => {
        console.log("CadastrarManutencaoPage -> alterar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
        this.tratarSucesso();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  adicionar() {
    this.manutencaoProvider.create(this.manutencao)
      .then((manutencao: Manutencao) => {
        console.log("CadastrarManutencaoPage -> adicionar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
        this.tratarSucesso();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  apagar() {
    this.manutencaoProvider.delete(this.manutencao)
      .then((manutencao: Array<any>) => {
        console.log("CadastrarManutencaoPage -> apagar -> manutencao");
        this.tratarSucesso();
        this.navCtrl.pop();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  tratarSucesso() {
    this.navCtrl.setRoot('ListagemManutencaoPage');
    this.mostrarToast('Sucesso!');
  }

  tratarErro(error) {
    (error.hasOwnProperty('error') && error.error.hasOwnProperty('message'))
      ? this.mostrarToast(error.error.message, 'danger')
      : this.mostrarToast('Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.', 'danger');
  }

  selecionarReparador() {
    let modal: Modal = this.modalCtrl.create('BuscarEmpresaPage', { 'tipo': 'REPARADOR', 'empresa': this.manutencao.nomeReparador });
    modal.present();
    modal.onWillDismiss((data) => {
      if (data) {
        this.manutencao.codigoReparador = data.codigo;
        this.manutencao.nomeReparador = data.nomefantasia;
      }
    });
  }

  selecionarSeguradora() {
    let modal: Modal = this.modalCtrl.create('BuscarEmpresaPage', { 'tipo': 'SEGURADORA', 'empresa': this.manutencao.nomeSeguradora });
    modal.present();
    modal.onWillDismiss((data) => {
      if (data) {
        this.manutencao.codigoSeguradora = data.codigo;
        this.manutencao.nomeSeguradora = data.nomefantasia;
      }
    });
  }

  getPecasServicos() {
    this.psProvider.get()
      .then((pecas: Array<PecaServico>) => {
        if (pecas != null) {
          this.listaPecas = pecas;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  inserirNovoItem() {
    if (this.categoria) {
      this.inserirItem(new ItemManutencao(null, null, null, null, this.categoria, null), this.manutencao.itensManutencao.length);
    } else {
      this.mostrarToast("Por favor selecione a categoria.");
    }
  }

  inserirItem(item: ItemManutencao, index) {
    let carro: boolean = this.veiculoSelecionado.modalidade == 'Carro';
    let modal: Modal = this.modalCtrl.create('CadastroItemPage', { 'item': item, 'carro': carro });
    modal.present();
    modal.onWillDismiss((data) => {
      if (data) {
        this.manutencao.itensManutencao[index] = data;
        this.calcularValorTotal();
      }
    });
  }

  removerItem(index){
    this.manutencao.itensManutencao.splice(index,1);
  }

  calcularValorTotal(){
    var total = 0;
    if(this.manutencao.itensManutencao && this.manutencao.itensManutencao.length > 0){
      for(let item of this.manutencao.itensManutencao){
        total = total + (item.valorUnitario * item.quantidade);
      }
    }
    this.valorTotal = "R$ "+ this.mask.gerarValorMonetario(this.mask.converterParaString(total));
  }

  mostrarToast(mensagem: string, clazz?: string) {
    let cssClass = (clazz == undefined) ? 'default' : clazz;
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      cssClass: cssClass
    });
    toast.present();
  }
}
