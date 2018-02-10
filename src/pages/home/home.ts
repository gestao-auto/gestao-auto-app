import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { HomeProvider } from '../../providers/home/home';
import { Modal, ModalController } from 'ionic-angular';
import { HomeManutencao } from '../../model/homeManutencao';
import { Veiculo } from '../../model/veiculo';

import { ToastController } from 'ionic-angular';
import { VeiculoProvider} from '../../providers/veiculo/veiculo';
import { NotificacaoProvider } from '../../providers/notificacao/notificacao';
import { JwtHelper } from "angular2-jwt";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  manutencao : HomeManutencao;
  codigoUsuario : number;
  codigoVeiculo : number;
  veiculoSelecionado : any;
  // notificacoesPendente : Array<Notificacao>;
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private veiculoProvider : VeiculoProvider,
    private homeProvider: HomeProvider,
    private notificacaoProvider : NotificacaoProvider,
    ) {

      this.manutencao = new HomeManutencao(null, null, null, null, null, null, null, null, null);
      this.veiculoSelecionado = {'codigo' : 0, 'nome': "Sem veículo"};
      //this.notificacoesPendente = [];
      this.codigoUsuario = null;

      // Recupera o veículo selecionado
      this.storage.get('veiculo').then(
         veiculo => {
           if (veiculo != null) {
             this.veiculoSelecionado = veiculo;
             this.get();
           } else {
             //Recupera o usuário logado e busca seus veículos
             this.storage.get('token').then(
               token => {
                 this.codigoUsuario = this.jwtHelper.decodeToken(token).sub;
                 this.getVeiculo(this.codigoUsuario);
             });
           }
      });
  }

  getVeiculo(usuario : number) {
    this.veiculoProvider.getByUser(usuario)
      .then((veiculos : Array<Veiculo>) => {
        if (veiculos.length > 0) {
          this.veiculoSelecionado = {'codigo': veiculos[0].codigo, 'nome': veiculos[0].nome};
          this.storage.set("veiculo", this.veiculoSelecionado).then((val) => {
            this.get();
          });
        } else {
            this.storage.set("veiculo", this.veiculoSelecionado);
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  get() {
    this.homeProvider.getManutencao(this.veiculoSelecionado.codigo)
      .then((manutencao: HomeManutencao) => {
          console.log(manutencao);
          if (manutencao != null) {
            this.manutencao = manutencao;
          } else {
            this.manutencao = new HomeManutencao(null, null, null, null, null, null, null, null, null);
          }
        }, (error) => {
          this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
        })
  }

  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }

  selecionarVeiculo() {
    console.log('MODAL SELECIONAR - ' + this.veiculoSelecionado);
    let modal: Modal = this.modalCtrl.create('SelecionarVeiculoPage', {'veiculoAtual': this.veiculoSelecionado});
    modal.present();
    modal.onWillDismiss((data) => {
      this.veiculoSelecionado = (data == undefined) ? this.veiculoSelecionado : data;
      this.get();
    });
  }

  acessarManutencao(manutencao){
    console.log("Manutencao - " + manutencao);
    this.navCtrl.push('CadastrarManutencaoPage', {'manutencao' : manutencao});
  }

  // notificar() {
  //   this.notificacaoProvider.getNotificacoesPendentesDoUsuarioLogado()
  //     .then((notificacoes : Array<Notificacao>) => {
  //       if (notificacoes != null) {
  //           this.notificacoesPendente = notificacoes;
  //           console.log("Notificações recebidas: ", this.notificacoesPendente);
  //           this.gerarNotificacoes();
  //       }
  //     });
  // }
  //
  // gerarNotificacoes() {
  //   for (let i = 0; i < this.notificacoesPendente.length; i++) {
  //       this.localNotifications.schedule({
  //         id : this.notificacoesPendente[i].codigo,
  //         title : this.notificacoesPendente[i].tipoNotificacao,
  //         text: this.notificacoesPendente[i].mensagem,
  //         at: new Date(new Date().getTime() + 5 * 1000),
  //       });
  //   }
  // }
}
