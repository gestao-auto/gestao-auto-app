import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarManutencaoPage } from './cadastrar-manutencao';

@NgModule({
  declarations: [
    CadastrarManutencaoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarManutencaoPage),
  ],
})
export class CadastrarManutencaoPageModule {}
