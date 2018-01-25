import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { PreferenciasProvider } from '../../providers/preferencias/preferencias';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Preferencias } from '../../model/preferencias';
import { JwtHelper } from "angular2-jwt";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-preferencias',
  templateUrl: 'preferencias.html',
})
export class PreferenciasPage {

  preferencias : Preferencias;
  codigoUsuario : number;
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage : Storage,
    private privateview : ViewController,
    private toastCtrl : ToastController,
    private preferenciasProvider : PreferenciasProvider) {

    this.codigoUsuario = null;
    this.preferencias = new Preferencias(null, null, "09:00", 15, 500);

    this.storage.get('token').then(
         token => {
           this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
           this.get();
         });
    }

    get() {
      this.preferenciasProvider.get(this.codigoUsuario)
        .then((preferencias: Preferencias) => {
          console.log(preferencias);
            if (preferencias != null) {
              this.preferencias = preferencias;
            }
          }, (error) => {
            this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
          })
    }

    submit() {
      if (!this.valida()) {
        return this.mostrarToast("Uma ou mais informações não foram preenchidas. Verifique!");
      }
      if (this.preferencias.codigo != undefined) {
          return this.update();
      }
      return this.save();
    }

    save() {
      this.preferencias.codigoUsuario = this.codigoUsuario;
      this.preferenciasProvider.create(this.preferencias)
        .then((res) => {
          if (res) {
            this.mostrarToast("Salvo com sucesso!");
            //this.navCtrl.push('HomePage');
          }
        }, (error) => {
            this.mostrarToast("Ops! Ocorreu uma falha ao atualizar suas informações. Por favor, tente novamente.");
        });
    }

    update() {
      this.preferenciasProvider.update(this.preferencias)
        .then((res) => {
          if (res) {
            this.mostrarToast("Atualizado com sucesso!");
            //this.navCtrl.push('HomePage');
          }
        }, (error) => {
          this.mostrarToast("Ops! Ocorreu uma falha ao cadastrar suas informações. Por favor, tente novamente.");
        });
    }

    valida() : boolean {
      if (this.preferencias.horarioNotificacao == "" || this.preferencias.diasAntecedenciaNotificacaoRevisao == null
          || this.preferencias.hodometroAntecedenciaNotificacaoRevisao == null) {
            return false;
        }
        return true;
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
