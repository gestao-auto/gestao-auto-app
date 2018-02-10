import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarOficinaPage } from './buscar-oficina';

@NgModule({
  declarations: [
    BuscarOficinaPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarOficinaPage),
  ],
})
export class BuscarOficinaPageModule {}
