import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { HttpErrorResponse } from '@angular/common/http';
import { Modal, ModalController } from 'ionic-angular';
import { IndicadorGastoIndividualManutencao } from '../../model/indicadorGastoIndividualManutencao';
import { Veiculo } from '../../model/veiculo';
import { ToastController } from 'ionic-angular';
import { VeiculoProvider} from '../../providers/veiculo/veiculo';
import { IndicadorIndividualProvider } from '../../providers/indicador-individual/indicador-individual';
import { JwtHelper } from "angular2-jwt";


@IonicPage()
@Component({
  selector: 'page-relatorio-gasto-individual-manutencao',
  templateUrl: 'relatorio-gasto-individual-manutencao.html',
})
export class RelatorioGastoIndividualManutencaoPage {

    codigoUsuario : number;
    codigoVeiculo : number;
    veiculoSelecionado : any;
    indicador : IndicadorGastoIndividualManutencao;
    dataInicial : string;
    dataFinal : string;
    jwtHelper = new JwtHelper();
    //Grafico
    doughnutChartLabels:string[];
    doughnutChartData:number[];
    doughnutChartType:string;
    options: any;


    constructor (public navCtrl: NavController, public navParams: NavParams, public storage : Storage,  public view : ViewController,
      private toastCtrl: ToastController,   private modalCtrl: ModalController, private veiculoProvider : VeiculoProvider,
      private indicadorProvider : IndicadorIndividualProvider) {

        this.dataInicial = "2016-01-01";
        this.dataFinal = "2018-01-01";

        //Gráfico - Deixar dinâmico
        this.doughnutChartLabels= ['Pneu', 'Amortecedor', 'Troca de óleo' , 'Filtro de ar', 'Filtro de combustível', 'Teste'];
        this.doughnutChartData = [2, 5, 20, 6, 5, 10];
        this.doughnutChartType = 'doughnut';
        this.options  = { legend: { position: 'left', labels: {usePointStyle: true, fontSize: 7}} };

        this.indicador = new IndicadorGastoIndividualManutencao(null, null, null, null,null, null)
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
            this.storage.set("veiculo", this.veiculoSelecionado);
            this.get();
          } else {
              this.storage.set("veiculo", this.veiculoSelecionado);
          }
        }, (error) => {
          this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
        })
    }


    get() {
      console.log("chegou no get");
       this.indicadorProvider.getGastosComManutencao(this.veiculoSelecionado.codigo, this.dataInicial, this.dataFinal)
        .then((indicador: IndicadorGastoIndividualManutencao) => {
            console.log(indicador);
            if (indicador != null) {
              this.indicador = indicador;
            } else {
              this.indicador = new IndicadorGastoIndividualManutencao(null, null, null, null, null, null);
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

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }
}
