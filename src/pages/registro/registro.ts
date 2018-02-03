import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Storage } from "@ionic/storage";
import { ToastController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../../model/usuario';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario : Usuario;
  confirmarSenha : String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private authProvider: AuthenticationProvider,
    private storage: Storage,
    private toastCtrl: ToastController
    ) {
      this.confirmarSenha = null;
      this.usuario = new Usuario(null ,null, null, null);
  }

  cadastrar(){
    if(this.validarSenha()){
      this.usuario.dataAceiteTermoUso = this.dataHoje();
      this.authProvider.cadastrar(this.usuario).subscribe(
          data => this.authSuccess(data),
          (err: HttpErrorResponse) => {
            this.authError(err)
          }
      );
    }
  }

  validarSenha(){
    if(this.usuario.senha.length < 6){
      this.mostrarToast('A senha deve ter no mínimo 6 caracteres');
    } else if (this.usuario.senha != this.confirmarSenha){
      this.mostrarToast('As senhas digitadas são diferentes');
    }else{
      return true;
    }
    return false;
  }

  authSuccess(token) {
    this.storage.set('token', token).then((val) => {
      this.navCtrl.setRoot('ProprietarioPage');
    });
  }

  authError(err){
    let errorMessage : string;
    if (err.error instanceof Error) {
      console.log('Um erro ocorreu: ', err.error.message);
    } else {
        errorMessage ='Erro '+ err.status +': '+ err.error;
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

   dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth()+1;
    var mesString = mes < 10 ? '0'+ mes.toString() : mes.toString();
    var ano = data.getFullYear();
    return [ano, mesString, dia].join('-');
}

}
