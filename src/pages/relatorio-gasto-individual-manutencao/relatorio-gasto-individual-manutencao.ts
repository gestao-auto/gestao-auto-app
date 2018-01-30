import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-relatorio-gasto-individual-manutencao',
  templateUrl: 'relatorio-gasto-individual-manutencao.html',
})
export class RelatorioGastoIndividualManutencaoPage {

  public legenda:string[] = ['Pneu', 'Amortecedor', 'Troca de óleo' , 'Filtro de ar', 'Filtro de combustível', 'Teste'];
  public dados:number[] = [2, 5, 20, 6, 5, 10];
  public tipo:string = 'doughnut';
  private opcoes: any = { legend: { position: 'left', labels: {usePointStyle: true, fontSize: 7}} };

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
