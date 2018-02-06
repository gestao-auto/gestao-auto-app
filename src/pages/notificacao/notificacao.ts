import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalNotifications } from "@ionic-native/local-notifications";

@IonicPage()
@Component({
  selector: 'page-notificacao',
  templateUrl: 'notificacao.html',
})
export class NotificacaoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,   private localNotifications: LocalNotifications,) {
  }

  notificar() {
    this.localNotifications.schedule({
      id : 1,
      title : 'Revisão',
      text: 'A revisão do seu veículo está programada',
      at: new Date(new Date().getTime() + 5 * 1000),
      data : {mydata : 'Oi sou a Marihelly! :)'}
    });
  }

}
