import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-carro-pneu',
  templateUrl: 'carro-pneu.html',
})
export class CarroPneuPage {
  dianteiroEsquerdo : boolean;
  traseiroEsquerdo : boolean;
  dianteiroDireito : boolean;
  traseiroDireito : boolean;
  estepe : boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.dianteiroEsquerdo = false;
    this.traseiroEsquerdo = false;
    this.dianteiroDireito = false;
    this.traseiroDireito = false;
    this.estepe = false;
  }
  fecharModal(){
    this.viewCtrl.dismiss();
  }
}
