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
  listaTeste = Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private manutencaoProvider: ManutencaoProvider) {

      this.listaTeste = [
        { tipo: 'Revisão', km: '100.000', anos:'10', realizada:'Realizada', data:'10/12/2017', oficina:'metronorte', valor:'3.000,00' },
        { tipo: 'Manutenção', km: '90.000', anos:'9', realizada:'Realizada', data:'10/06/2017', oficina:'Andrade', valor:'600,00' }
      ];

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
    this.manutencaoProvider.get(this.codigoVeiculo)
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
