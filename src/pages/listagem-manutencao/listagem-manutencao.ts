import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelper } from "angular2-jwt";
import { ToastController } from 'ionic-angular';
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
  codigoVeiculo : number;
  jwtHelper = new JwtHelper();
  manutencoes = Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private manutencaoProvider: ManutencaoProvider) {

    this.codigoUsuario = null;
    this.codigoVeiculo = 1;

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
    this.manutencaoProvider.getByVehicle(this.codigoVeiculo)
      .then((manutencoes: Array<any>) => {
        console.log("ManutencaoPage -> get -> manutencoes: " + manutencoes.toString());
        if (manutencoes != null) {
          this.manutencoes = manutencoes;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
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
