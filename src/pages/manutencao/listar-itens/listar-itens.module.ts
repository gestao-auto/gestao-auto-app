import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListarItensPage } from './listar-itens';

@NgModule({
  declarations: [
    ListarItensPage,
  ],
  imports: [
    IonicPageModule.forChild(ListarItensPage),
  ],
})
export class ListarItensPageModule {}
