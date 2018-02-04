import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-carro-suspensao',
  templateUrl: 'carro-suspensao.html',
})
export class CarroSuspensaoPage {
  dianteiroEsquerdo : boolean;
  traseiroEsquerdo : boolean;
  dianteiroDireito : boolean;
  traseiroDireito : boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.dianteiroEsquerdo = false;
    this.traseiroEsquerdo = false;
    this.dianteiroDireito = false;
    this.traseiroDireito = false;
  }
  fecharModal(){
    this.viewCtrl.dismiss();
  }
}
