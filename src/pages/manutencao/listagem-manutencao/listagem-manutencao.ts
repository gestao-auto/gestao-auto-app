import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController, ToastController } from 'ionic-angular';
import { Modal, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelper } from "angular2-jwt";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';
import { Manutencao } from '../../../model/manutencao';
import { Mask } from '../../../utils/mask/mask';

@IonicPage()
@Component({
  selector: 'page-listagem-manutencao',
  templateUrl: 'listagem-manutencao.html',
})
export class ListagemManutencaoPage {
  veiculoSelecionado : any;
  jwtHelper = new JwtHelper();
  manutencoes = Array<Manutencao>();
  itens = Array<any>();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage : Storage,
    private view : ViewController,
    private toastCtrl: ToastController,
    private manutencaoProvider: ManutencaoProvider,
    private modalCtrl: ModalController,
    private mask: Mask
  ) {
    this.veiculoSelecionado = {'codigo': 0, 'nome': 'Sem veiculo'};

    this.storage.get('veiculo').then(
      veiculo => {
        if(veiculo == null){
          this.veiculoSelecionado = (veiculo == null) ? this.veiculoSelecionado : veiculo;
          this.mostrarToast("Não há veículos cadastrados, cadastre um veículo antes de prosseguir.");
        } else {
          this.veiculoSelecionado = veiculo;
          this.get();
        }
    });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter ListagemManutencaoPage');
    if(this.manutencoes != null && this.veiculoSelecionado.codigo != 0){
      this.get();
    }
  }

  get() {
    this.manutencaoProvider.getByVehicle(this.veiculoSelecionado.codigo)
      .then((manutencoes: Array<Manutencao>) => {
        if (manutencoes != null) {
          this.manutencoes = manutencoes;
          for(let man of this.manutencoes){
            this.calcularValorTotal(man);
          }
        }
      }, (error) => {
          console.log(error);
            this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      });

  }

  public calcularValorTotal(manutencao){
    this.itens = manutencao.itensManutencao;
      var total = 0;
      if(manutencao.itensManutencao && manutencao.itensManutencao.length > 0){
        for(let item of manutencao.itensManutencao){
          total = total + (item.valorUnitario * item.quantidade);
        }
      }
      manutencao.valorTotal = this.mask.gerarValorMonetario(this.mask.converterParaString(total));
  }

  selecionarVeiculo(){
    console.log('MODAL SELECIONAR - ' + this.veiculoSelecionado);
    let modal: Modal = this.modalCtrl.create('SelecionarVeiculoPage', {'veiculoAtual': this.veiculoSelecionado});
    modal.present();
    modal.onWillDismiss((data) => {
      this.veiculoSelecionado = (data == undefined) ? this.veiculoSelecionado : data;
      this.manutencoes = null;
      this.get();
    });
  }

  addManutencao(){
    if(this.veiculoSelecionado.codigo!= 0){
      this.acessarManutencao({'codigoVeiculo': this.veiculoSelecionado.codigo});
    }else{
      this.mostrarToast("Não há veículos cadastrados, cadastre um veículo antes de prosseguir.");
    }
  }

  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }

  acessarManutencao(index){
    this.navCtrl.push('CadastrarManutencaoPage', {'manutencao' : this.manutencoes[index]});
  }
}
