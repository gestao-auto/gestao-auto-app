import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-moto-suspensao',
  templateUrl: 'moto-suspensao.html',
})
export class MotoSuspensaoPage {
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
