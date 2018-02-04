import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro-item',
  templateUrl: 'cadastro-item.html',
})
export class CadastroItemPage {
  itemSelecionado : string;
  item : any;
  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.itemSelecionado = "";
    this.item = {quantidade: 0, valorUnitario: 0, observacao: ""};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroItemPage');
  }

  salvar(){
    this.navCtrl.remove(this.navCtrl.getActive().index, 2);
    this.navCtrl.push('ListarItensPage', {'item' : this.item});
  }

  voltar(){
    this.navCtrl.pop();
  }
}