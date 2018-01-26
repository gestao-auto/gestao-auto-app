import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelecionarVeiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selecionar-veiculo',
  templateUrl: 'selecionar-veiculo.html',
})
export class SelecionarVeiculoPage {
  veiculoAtual: any;
  veiculos = Array<any>();

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
    console.log('SelecionarVeiculoPage - ' + this.navParams.get('veiculoAtual'));
    this.veiculoAtual = this.navParams.get('veiculoAtual');
    this.veiculos = [{'codigo': 1, 'nome': 'Cobalt'},{'codigo': 2, 'nome': 'Logan'}];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelecionarVeiculoPage');
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }

  selecionar(veiculo){
    this.viewCtrl.dismiss(veiculo);
  }
}