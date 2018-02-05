import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController, ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { ManutencaoProvider } from '../../../providers/manutencao/manutencao';
import { JwtHelper } from "angular2-jwt";
import { Mask } from '../../../utils/mask/mask';

@IonicPage()
@Component({
  selector: 'page-cadastrar-manutencao',
  templateUrl: 'cadastrar-manutencao.html',
})
export class CadastrarManutencaoPage {
  fixoRevisao : boolean;
  manutencao : any;
  codigoUsuario : string;
  jwtHelper = new JwtHelper();

  constructor(private navCtrl: NavController
    , private navParams: NavParams
    , private viewCtrl: ViewController
    , private storage : Storage
    , private manutencaoProvider: ManutencaoProvider
    , private toastCtrl: ToastController
    , private mask : Mask) {
      console.log('CadastrarManutencaoPage - ' + this.navParams.get('manutencao'));

      this.fixoRevisao = false;
      this.codigoUsuario = "";

      this.manutencao = this.navParams.get('manutencao');
      this.manutencao = (this.manutencao == null) ? {} : this.manutencao;
      this.fixoRevisao = this.isFixedRevision();
      if(this.fromHome()){
        console.log('CadastrarManutencaoPage - fromHome');
        this.manutencaoProvider.get(this.manutencao["codigo"])
          .then((manutencao: any) => {
            this.manutencao = (manutencao != null) ? manutencao : {};
            this.fixoRevisao = this.isFixedRevision();
          }, (error) => {
            this.tratarErro(error);
          })
      }

      this.storage.get('token').then(
        token => {
          this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarManutencaoPage');
  }

  private fromHome(){
    return this.manutencao != null && this.manutencao.hasOwnProperty('diasRestantes');
  }

  private isFixedRevision(){
    return this.manutencao != null && this.manutencao['tipoManutencao'] == 'REVISAO';
  }

  aplicarMascara(campo, valor, mascara) {
    this.manutencao[campo] = this.mask.atualizarValor(valor,mascara);
  }

  salvar(){
    (this.manutencao['codigo'] != null && this.manutencao['codigo'] != "")
      ? this.alterar() : this.adicionar();
  }

  alterar() {
    this.manutencaoProvider.update(this.manutencao)
      .then((manutencao: any) => {
        console.log("CadastrarManutencaoPage -> alterar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
        this.tratarSucesso();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  adicionar() {
    this.manutencaoProvider.create(this.manutencao)
      .then((manutencao: Array<any>) => {
        console.log("CadastrarManutencaoPage -> adicionar -> manutencao: " + manutencao.toString());
        if (manutencao != null) {
          this.manutencao = manutencao;
        }
        this.tratarSucesso();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  apagar() {
    this.manutencaoProvider.delete(this.manutencao)
      .then((manutencao: Array<any>) => {
        console.log("CadastrarManutencaoPage -> apagar -> manutencao");
        this.tratarSucesso();
        this.navCtrl.pop();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  itens(){
    console.log("CadastrarManutencaoPage -> itens: " + this.manutencao);
    this.navCtrl.push('ListarItensPage', {'manutencao' : this.manutencao});
  }

  tratarSucesso(){
    this.mostrarToast('Sucesso!');
  }

  tratarErro(error){
    (error.hasOwnProperty('error') && error.error.hasOwnProperty('message'))
        ? this.mostrarToast(error.error.message, 'danger')
          : this.mostrarToast('Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.', 'danger');
  }

  mostrarToast(mensagem : string, clazz? : string) {
    let cssClass = (clazz == undefined) ? 'default' : clazz; 
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top',
        cssClass: cssClass
      });
    toast.present();
  }
}