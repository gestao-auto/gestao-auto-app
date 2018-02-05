import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarVeiculoPage } from './editar-veiculo';

@NgModule({
  declarations: [
    EditarVeiculoPage
  ],
  imports: [
    IonicPageModule.forChild(EditarVeiculoPage),
  ],
})
export class EditarVeiculoPageModule {}
