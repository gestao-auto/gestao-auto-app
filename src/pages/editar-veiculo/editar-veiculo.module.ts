import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarVeiculoPage } from './editar-veiculo';
import { Mask } from "../../directive/Mask";

@NgModule({
  declarations: [
    EditarVeiculoPage,
    Mask
  ],
  imports: [
    IonicPageModule.forChild(EditarVeiculoPage),
  ],
})
export class EditarVeiculoPageModule {}
