import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarEmpresaPage } from './buscar-empresa';

@NgModule({
  declarations: [
    BuscarEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarEmpresaPage),
  ],
})
export class BuscarEmpresaPageModule {}
