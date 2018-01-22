import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VeiculoPage } from './veiculo';

@NgModule({
  declarations: [
    VeiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(VeiculoPage),
  ],
})
export class VeiculoPageModule {}
