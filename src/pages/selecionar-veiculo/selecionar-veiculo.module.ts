import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecionarVeiculoPage } from './selecionar-veiculo';

@NgModule({
  declarations: [
    SelecionarVeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecionarVeiculoPage),
  ],
})
export class SelecionarVeiculoPageModule {}
