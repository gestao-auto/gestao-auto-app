import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RelatorioGastoIndividualManutencaoPage } from './relatorio-gasto-individual-manutencao';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    RelatorioGastoIndividualManutencaoPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(RelatorioGastoIndividualManutencaoPage),
  ],
})
export class RelatorioGastoIndividualManutencaoPageModule {}
