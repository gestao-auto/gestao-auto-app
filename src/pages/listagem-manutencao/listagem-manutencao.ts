import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController, ToastController } from 'ionic-angular';
import { Modal, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelper } from "angular2-jwt";
import { ManutencaoProvider } from '../../providers/manutencao/manutencao';
import { Manutencao } from '../../model/manutencao';

/**
 * Generated class for the ListagemManutencaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listagem-manutencao',
  templateUrl: 'listagem-manutencao.html',
})
export class ListagemManutencaoPage {
  codigoUsuario : number;
  veiculoSelecionado : any;
  jwtHelper = new JwtHelper();
  manutencoes = Array<any>();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage : Storage,
    private view : ViewController,
    private toastCtrl: ToastController,
    private manutencaoProvider: ManutencaoProvider,
    private modalCtrl: ModalController) {

    this.codigoUsuario = null;
    this.veiculoSelecionado = {'codigo': 0, 'nome': 'Sem veiculo'};

    this.storage.get('veiculo').then(
      veiculo => {
        this.veiculoSelecionado = (veiculo == null) 
          ? this.veiculoSelecionado
          : JSON.parse(veiculo);
      });
    this.storage.get('token').then(
      token => {
        this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
        this.get();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListagemManutencaoPage');
  }

  get() {
    this.manutencaoProvider.getByVehicle(this.veiculoSelecionado.codigo)
      .then((manutencoes: Array<any>) => {
        console.log("ManutencaoPage -> get -> manutencoes: " + manutencoes.toString());
        if (manutencoes != null) {
          this.manutencoes = manutencoes;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  selecionarVeiculo(){
    console.log('MODAL SELECIONAR - ' + this.veiculoSelecionado);
    let modal: Modal = this.modalCtrl.create('SelecionarVeiculoPage', {'veiculoAtual': this.veiculoSelecionado});
    modal.present();
    modal.onWillDismiss((data) => {
      this.veiculoSelecionado = (data == undefined) ? this.veiculoSelecionado : data;
      this.get();
    });
  }

  addManutencao(){
    this.navCtrl.push('CadastrarManutencaoPage');
  }

  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }

  onClick(type){
    console.log("TIPO - " + type);
  }
}
