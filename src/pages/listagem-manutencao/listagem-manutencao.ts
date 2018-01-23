import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelper } from "angular2-jwt";
import { ToastController } from 'ionic-angular';

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
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController) {

    this.codigoUsuario = null;

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
  //   this.propProvider.get(this.codigoUsuario)
  //     .then((proprietario: Proprietario) => {
  //         if (proprietario != null) {
  //           this.proprietario = proprietario;
  //         }
  //       }, (error) => {
  //         this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
  //       })
  }
}