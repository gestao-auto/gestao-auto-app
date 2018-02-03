import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Modal, ModalController } from 'ionic-angular';
import { IndicadorGastoIndividualManutencao } from '../../model/indicadorGastoIndividualManutencao';
import { Veiculo } from '../../model/veiculo';
import { ToastController } from 'ionic-angular';
import { VeiculoProvider} from '../../providers/veiculo/veiculo';
import { IndicadorIndividualProvider } from '../../providers/indicador-individual/indicador-individual';
import { JwtHelper } from "angular2-jwt";
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Storage } from "@ionic/storage";

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
    //Gráfico
    doughnutChartLabels:string[];
    doughnutChartData:number[]
    doughnutChartType:string;
    options: any;
    @ViewChild('myChart')  myChart: BaseChartDirective;

    constructor (public navCtrl: NavController, public navParams: NavParams, public storage : Storage,  public view : ViewController,
      private toastCtrl: ToastController,   private modalCtrl: ModalController, private veiculoProvider : VeiculoProvider,
      private indicadorProvider : IndicadorIndividualProvider ) {

        this.dataInicial = null;
        this.dataFinal = null;
        this.indicador = new IndicadorGastoIndividualManutencao(null, null, null, null,null, null, null);
        this.veiculoSelecionado = {'codigo' : 0, 'nome': "Sem veículo"};
        this.setConfigInicialGrafico();

        // Recupera o veículo selecionado
        this.storage.get('veiculo').then(
           veiculo => {
             if (veiculo != null) {
               this.veiculoSelecionado = veiculo;
               this.submit();
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
            this.submit();
          } else {
              this.storage.set("veiculo", this.veiculoSelecionado);
          }
        }, (error) => {
          this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
        })
    }

    submit() {
      if (this.dataInicial == null || this.dataFinal == null) {
        return;
      }
      this.get();
    }


    get() {
       this.indicadorProvider.getGastosComManutencao(this.veiculoSelecionado.codigo, this.dataInicial, this.dataFinal)
        .then((indicador: IndicadorGastoIndividualManutencao) => {
            if (indicador != null) {
              this.indicador = indicador;
              this.doughnutChartData = this.indicador.quantidadeItensManuteidos;
              this.doughnutChartLabels = this.indicador.nomeItensManuteidos;
              this.updateGrafico();
            } else {
              this.indicador = new IndicadorGastoIndividualManutencao(null, null, null, null, null, null, null);
              this.mostrarToast("Não encontramos nenhuma informação para o período informado. Por favor, selecione outro período.");
            }
          }, (error) => {
            this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
          })
    }

    selecionarVeiculo() {
      let modal: Modal = this.modalCtrl.create('SelecionarVeiculoPage', {'veiculoAtual': this.veiculoSelecionado});
      modal.present();
      modal.onWillDismiss((data) => {
        this.veiculoSelecionado = (data == undefined) ? this.veiculoSelecionado : data;
        this.get();
      });
    }

    private setConfigInicialGrafico() {
      this.options  = { legend: { position: 'left', labels: {usePointStyle: true, fontSize: 7}} };
      this.doughnutChartType="doughnut";
    }

    private updateGrafico() {
      if (this.myChart == undefined) {
        return;
      }
        var config = {
          type: 'doughnut',
          data: {
              datasets: [{
                  data: this.indicador.quantidadeItensManuteidos,
                  label: 'Dataset 1',
                  backgroundColor : this.getCoresParaGrafico(this.indicador.quantidadeItensManuteidos.length)
              }],
              labels: this.indicador.nomeItensManuteidos
          },
          options: {
              responsive: true,
              legend: {
                  position: 'left',
              },
              animation: {
                  animateScale: true,
                  animateRotate: true
              }
          }
        };
        this.myChart.chart.config = config;
    }

    private getCoresParaGrafico(quantidade : number) {
      var cores : string[] = new Array(quantidade)
      for (let i = 0; i < quantidade; i++) {
          cores[i] = this.gerarCorAleatoria();
      }
      return cores;
    }

    private gerarCorAleatoria() {
      var hex = '0123456789ABCDEF';
      var cor = '#';
      for (var i = 0; i < 6; i++ ) {
          cor += hex[Math.floor(Math.random() * 16)];
      }
      return cor;
    }

    private chartClicked(e) {}

    private mostrarToast(mensagem : string) {
      let toast = this.toastCtrl.create({
          message: mensagem,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
      toast.present();
    }
  }
