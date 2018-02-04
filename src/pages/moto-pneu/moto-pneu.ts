import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-moto-pneu',
  templateUrl: 'moto-pneu.html',
})
export class MotoPneuPage {
  traseiro : boolean;
  dianteiro : boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.traseiro = false;
    this.dianteiro = false;
  }

  fecharModal(){
    this.viewCtrl.dismiss();
  }
}
