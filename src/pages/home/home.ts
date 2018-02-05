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
import { JwtHelper } from "angular2-jwt";
import { LocalNotifications } from "@ionic-native/local-notifications";

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
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage : Storage,
    public view : ViewController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private localNotifications: LocalNotifications,
    private veiculoProvider : VeiculoProvider,
    private homeProvider: HomeProvider) {

      this.manutencao = new HomeManutencao(null, null, null, null, null, null, null, null, null);
      this.veiculoSelecionado = {'codigo' : 0, 'nome': "Sem veículo"};

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

  submit() {}

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
}
