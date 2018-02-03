import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { VeiculoProvider } from '../../providers/veiculo/veiculo';
import { JwtHelper } from "angular2-jwt";


@IonicPage()
@Component({
  selector: 'page-selecionar-veiculo',
  templateUrl: 'selecionar-veiculo.html',
})
export class SelecionarVeiculoPage {
  veiculoAtual: any;
  veiculos = Array<any>();
  codigoUsuario : number;
  jwtHelper = new JwtHelper();

  constructor(private viewCtrl: ViewController
    , private navParams: NavParams
    , private storage : Storage
    , private veiculoProvider: VeiculoProvider
    , private toastCtrl: ToastController) {
      console.log('SelecionarVeiculoPage - ' + this.navParams.get('veiculoAtual'));

      this.codigoUsuario = null;
      this.veiculoAtual = this.navParams.get('veiculoAtual');

      this.storage.get('token').then(
        token => {
          this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
          this.get();
      });
  }

  get() {
    this.veiculoProvider.getByUser(this.codigoUsuario)
      .then((veiculos: Array<any>) => {
        console.log("SelecionarVeiculoPage -> get -> veiculos: " + veiculos.toString());
        if (veiculos != null) {
          this.veiculos = veiculos;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelecionarVeiculoPage');
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  selecionar(veiculo) {
    this.storage.set("veiculo", {'codigo': veiculo.codigo, 'nome': veiculo.nome}).then((val) => {
      this.viewCtrl.dismiss(veiculo);
    });
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
