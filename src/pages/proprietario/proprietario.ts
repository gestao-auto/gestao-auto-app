import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { ProprietarioProvider } from '../../providers/proprietario/proprietario';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Proprietario } from '../../model/proprietario';
import { JwtHelper } from "angular2-jwt";

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
    private propProvider: ProprietarioProvider) {

    this.codigoUsuario = null;
    this.proprietario = new Proprietario(null, null, null, null, null, null);

    this.storage.get('token').then(
         token => {
           this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
           this.get();
         }
      );
  }


  get() {
    this.propProvider.get(this.codigoUsuario)
      .then((proprietario: Proprietario) => {
          if (proprietario != null) {
            this.proprietario = proprietario;
          }
          console.log("OK", this.proprietario);
        }, (error) => {
          console.log("Error", this.proprietario);
        })
  }

  save() {
    if (this.proprietario.codigo != undefined) {
      this.update();
    } else {
      this.proprietario.codigoUsuario = this.codigoUsuario;
      this.propProvider.create(this.proprietario)
        .then((res) => {
          if (res) {
            this.navCtrl.push('HomePage');
          }
        }, (error) => {
          console.log('Erro ao cadastrar proprietario', error);
        });
    }
  }

  update() {
    this.propProvider.update(this.proprietario)
      .then((res) => {
        if (res) {
          this.navCtrl.push('HomePage');
        }
      }, (error) => {
        console.log('Erro ao cadastrar proprietario', error);
      });
  }

}
