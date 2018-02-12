import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';
import { JwtHelper } from "angular2-jwt";
import { Mask } from '../../../utils/mask/mask';
import { Reparador } from '../../../model/reparador';
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
    console.log('CadastrarManutencaoPage - ' + this.navParams.get('manutencao'));
    this.getPecasServicos();
    this.fixoRevisao = false;
    this.codigoUsuario = "";

    this.manutencao = this.navParams.get('manutencao');
    this.manutencao = (this.manutencao == null) ? new Manutencao(null, null, null, null, null, null, null, null, null, null, null, null, null, null) : this.manutencao;
    this.fixoRevisao = this.isFixedRevision();
    if (this.fromHome()) {
      console.log('CadastrarManutencaoPage - fromHome');
      this.manutencaoProvider.get(this.manutencao.codigo)
        .then((manutencao: Manutencao) => {
          this.manutencao = (manutencao != null) ? manutencao : new Manutencao(null, null, null, null, null, null, null, null, null, null, null, null, null, null);
          this.fixoRevisao = this.isFixedRevision();
        }, (error) => {
          this.tratarErro(error);
        })
    }
    this.manutencao.itensManutencao = Array<ItemManutencao>();
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

  itens() {
    console.log("CadastrarManutencaoPage -> itens: " + this.manutencao);
    this.navCtrl.push('ListarItensPage', { 'manutencao': this.manutencao });
  }

  tratarSucesso() {
    this.mostrarToast('Sucesso!');
  }

  tratarErro(error) {
    (error.hasOwnProperty('error') && error.error.hasOwnProperty('message'))
      ? this.mostrarToast(error.error.message, 'danger')
      : this.mostrarToast('Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.', 'danger');
  }

  selecionarReparador() {
    let modal: Modal = this.modalCtrl.create('BuscarOficinaPage', { 'reparador': this.manutencao.nomeReparador });
    modal.present();
    modal.onWillDismiss((data) => {
      if (data) {
        this.manutencao.codigoReparador = data.codigoReparador;
        this.manutencao.nomeReparador = data.nomefantasia;
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
      }
    });
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
