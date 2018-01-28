import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { HomeProvider } from '../../providers/home/home';
import { Modal, ModalController } from 'ionic-angular';
//import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomeManutencao } from '../../model/homeManutencao';
//import { JwtHelper } from "angular2-jwt";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  manutencao : HomeManutencao;
  codigoVeiculo : number;
  veiculoSelecionado : any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private homeProvider: HomeProvider) {

      this.veiculoSelecionado = {'codigo': 0, 'nome': 'Sem veiculo'};
      this.manutencao = new HomeManutencao(null, null, null, null, null, null, null, null, null);

      this.storage.get('veiculo').then(
        veiculo => {
          this.veiculoSelecionado = (veiculo == null)  ? this.veiculoSelecionado : JSON.parse(veiculo);
          if (this.veiculoSelecionado.codigo > 0) {
              this.get();
          }
        });
    }

  get() {
    this.homeProvider.getManutencao(this.veiculoSelecionado.codigo)
      .then((manutencao: HomeManutencao) => {
        console.log(manutencao);
          if (manutencao != null) {
            this.manutencao = manutencao;
          }
        }, (error) => {
          this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
        })
  }

  submit() {}

  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }

  selecionarVeiculo() {
    console.log('MODAL SELECIONAR - ' + this.veiculoSelecionado);
    let modal: Modal = this.modalCtrl.create('SelecionarVeiculoPage', {'veiculoAtual': this.veiculoSelecionado});
    modal.present();
    modal.onWillDismiss((data) => {
      this.veiculoSelecionado = (data == undefined) ? this.veiculoSelecionado : data;
      this.get();
    });
  }
}
