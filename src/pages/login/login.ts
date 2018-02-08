import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private authProvider: AuthenticationProvider,
    private storage: Storage,
    private toastCtrl: ToastController,
    private notificacaoProvider : NotificacaoProvider
 ) {
     this.menuCtrl.swipeEnable(false);
     storage.ready().then(() => {
       storage.get('errorMessage').then(error => {
         console.log(error);
         this.mostrarToast(error);
       }).catch(console.log);
     });
     storage.remove('errorMessage');
   }

  logar(credenciais) {
    this.authProvider.login(credenciais).subscribe(
        data =>  this.authSuccess(data),
        (err: HttpErrorResponse) => {
          this.authError(err)
        }
      );
  }

  authSuccess(token) {
    console.log("Token ao logar: " + token);
    this.storage.set('token', token).then((val) => {
    this.notificacaoProvider.createObservador();
    this.navCtrl.push('HomePage');
    });
  }

  authError(err){
    let errorMessage : string;
    if (err.error instanceof Error) {
      console.log('Um erro ocorreu: ', err.error.message);
    } else {
      if(err.status == '401'){
        errorMessage = 'Usuário ou senha inválidos!'
      }else{
        errorMessage ='Erro '+ err.status +': '+ err.error;
      }
    }
    console.log(errorMessage);
    this.mostrarToast(errorMessage);
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
