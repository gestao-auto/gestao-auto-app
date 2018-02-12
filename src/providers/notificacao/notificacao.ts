import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { JwtHelper } from "angular2-jwt";
import { Observable } from 'rxjs/Rx';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Notificacao } from '../../model/notificacao';
import { ToastController } from 'ionic-angular';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/notificacao/ler/usuario/";

@Injectable()
export class NotificacaoProvider {

  jwtHelper = new JwtHelper();

  contentHeader = new HttpHeaders({"Content-Type": "application/json"});
  constructor(public http: HttpClient, private storage : Storage, private localNotifications : LocalNotifications, private toastCtrl: ToastController) {
  }

  get(codigoUsuario): Observable<Array<Notificacao>> {
    return this.http.get<Array<Notificacao>>(URL + codigoUsuario.toString());
  }

  // Notificações
  createObservador(token) {
    TimerObservable.create(0, 60 * 1000)
       .subscribe(() => {
         let codigoUsuario = this.jwtHelper.decodeToken(token).sub;
         this.get(codigoUsuario)
           .subscribe((data) => {
             this.notificar(data);
           });
       });
  }

  //TODO: remover o mostrarToast pois o modo debugger não permite a visualização do LocalNotification
  notificar(notificaoes : Array<Notificacao>) {
    if(notificaoes){
      for (let i = 0; i < notificaoes.length; i++) {
          this.mostrarToast(notificaoes[0].mensagem);
          this.localNotifications.schedule({
            id : notificaoes[i].codigo,
            title : notificaoes[i].tipoNotificacao,
            text: notificaoes[i].mensagem
          });
      }
    }
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
