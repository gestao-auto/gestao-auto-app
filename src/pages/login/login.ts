import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
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
    private notificacaoProvider : NotificacaoProvider,
    private alertCtrl: AlertController
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
        errorMessage ="Ops! Não conseguimos recuperar suas informações. Tente novamente mais tarde.";
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

  forgotPassword() {
    let forgotpas = this.alertCtrl.create({
      title: 'Esqueci minha senha',
      message: "Digite seu endereço de e-mail e nós o ajudaremos a redefinir sua senha",
      inputs: [
        {
          name: 'email',
          placeholder: 'E-mail'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            console.log('Solicitado');
          }
        }
      ]
    });
    forgotpas.present();
  }
}
