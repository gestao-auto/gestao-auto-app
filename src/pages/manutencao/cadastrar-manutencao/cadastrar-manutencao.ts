import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';
import { JwtHelper } from "angular2-jwt";

/**
 * Generated class for the CadastrarManutencaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-manutencao',
  templateUrl: 'cadastrar-manutencao.html',
})
export class CadastrarManutencaoPage {
  manutencao = {}
  codigoUsuario : string;
  jwtHelper = new JwtHelper();

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private viewCtrl: ViewController
    , private storage : Storage
    , private manutencaoProvider: ManutencaoProvider
    , private toastCtrl: ToastController) {
      console.log('CadastrarManutencaoPage - ' + this.navParams.get('manutencao'));

      this.codigoUsuario = "";
      this.manutencao = this.navParams.get('manutencao');

      this.storage.get('token').then(
        token => {
          this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarManutencaoPage');
  }

  salvar(){
    (this.manutencao["codigo"] != null && this.manutencao["codigo"] != "")
      ? this.alterar() : this.adicionar();
  }

  alterar() {
    this.manutencaoProvider.update(this.manutencao)
      .then((manutencao: any) => {
        console.log("CadastrarManutencaoPage -> alterar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      });
  }

  adicionar() {
    this.manutencaoProvider.create(this.manutencao)
      .then((manutencao: Array<any>) => {
        console.log("CadastrarManutencaoPage -> adicionar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      });
  }

  itens(){
    console.log("CadastrarManutencaoPage -> itens: " + this.manutencao);
    this.navCtrl.push('ListarItensPage', {'manutencao' : this.manutencao});
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