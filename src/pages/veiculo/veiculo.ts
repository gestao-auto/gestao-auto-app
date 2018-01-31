import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Veiculo } from '../../model/veiculo';
import { Modelo } from '../../model/modelo';
import { VeiculoProvider } from '../../providers/veiculo/veiculo'
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  jwtHelper = new JwtHelper();
  codigoUsuario : number;
  listaVeiculos = Array<Veiculo>();
  modelo : Modelo;
  veiculoSelecionado : Veiculo;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage : Storage,
              public veiculoProvider: VeiculoProvider,
              private toastCtrl: ToastController,
            ) {
              this.storage.get('token').then(
                   token => {
                     this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
                     this.getByUser();
                   });
  }

  getByUser(){
    console.log(this.codigoUsuario);
    this.veiculoProvider.getByUser(this.codigoUsuario)
      .then((veiculos: Array<Veiculo>) => {
          if (veiculos != null) {
            this.listaVeiculos = veiculos;
          }
        }, (error) => {
          this.mostrarToast("Não há veículos cadastrados.");
        })
  }

  novoVeiculo(){
    this.storage.remove("veiculoEditar");
    this.navCtrl.setRoot('EditarVeiculoPage');
  }

  editarVeiculo(veiculo){
    this.storage.set("veiculoEditar", JSON.stringify(veiculo));
    this.navCtrl.setRoot('EditarVeiculoPage');
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
