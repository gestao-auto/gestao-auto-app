import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { ProprietarioProvider } from '../../providers/proprietario/proprietario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Proprietario } from '../../model/proprietario';
import { JwtHelper } from "angular2-jwt";
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-proprietario',
  templateUrl: 'proprietario.html',
})
export class ProprietarioPage {

  proprietario : Proprietario;
  codigoUsuario : number;
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private propProvider: ProprietarioProvider) {

    this.codigoUsuario = null;
    this.proprietario = new Proprietario(null, null, null, null, null, null, null);

    this.storage.get('token').then(
         token => {
           this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
           this.get();
         });
    }

  get() {
    this.propProvider.get(this.codigoUsuario)
      .then((proprietario: Proprietario) => {
          if (proprietario != null) {
            this.proprietario = proprietario;
          }
        }, (error) => {
          this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
        })
  }

  submit() {
    if (!this.valida()) {
      return this.mostrarToast("Uma ou mais informações não foram preenchidas. Verifique!");
    }
    if (this.proprietario.codigo != undefined) {
        return this.update();
    }
    return this.save();
  }

  save() {
    this.proprietario.codigoUsuario = this.codigoUsuario;
    this.propProvider.create(this.proprietario)
      .then((res) => {
        if (res) {
          this.navCtrl.push('HomePage');
        }
      }, (error) => {
          this.mostrarToast("Ops! Ocorreu uma falha ao atualizar suas informações. Por favor, tente novamente.");
      });
  }

  update() {
    this.propProvider.update(this.proprietario)
      .then((res) => {
        if (res) {
          this.navCtrl.push('HomePage');
        }
      }, (error) => {
        this.mostrarToast("Ops! Ocorreu uma falha ao cadastrar suas informações. Por favor, tente novamente.");
      });
  }

  valida() : boolean {
    if (this.proprietario.nome == "" || this.proprietario.sobrenome == ""
        || this.proprietario.sexo == null || this.proprietario.idioma == null
        || this.proprietario.dataNascimento == null) {
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
