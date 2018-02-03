import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';


@IonicPage()
@Component({
  selector: 'page-listar-itens',
  templateUrl: 'listar-itens.html',
})
export class ListarItensPage {
  manutencao : any;

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private storage : Storage
    , private manutencaoProvider: ManutencaoProvider
    , private toastCtrl: ToastController) {
      console.log('ListarItensPage - ' + this.navParams.get('manutencao'));

      this.manutencao = this.navParams.get('manutencao');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListarItensPage');
  }

  item(codigoPeca){
    console.log("ListarItensPage -> itens: " + this.manutencao.itens);
    console.log("ListarItensPage -> peça: " + codigoPeca);
    this.navCtrl.push('CadastroItemPage', {'manutencao' : this.manutencao, 'item' : codigoPeca});
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