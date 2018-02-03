import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemManutencaoPage } from './listagem-manutencao';

@NgModule({
  declarations: [
    ListagemManutencaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemManutencaoPage),
  ],
})
export class ListagemManutencaoPageModule {}
