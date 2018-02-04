import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProprietarioPage } from './proprietario';
import { Mask } from "../../directive/Mask";

@NgModule({
  declarations: [
    ProprietarioPage,
        Mask
  ],
  imports: [
    IonicPageModule.forChild(ProprietarioPage),
  ],
})
export class ProprietarioPageModule {}
