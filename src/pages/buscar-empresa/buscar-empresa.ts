import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EmpresaProvider } from "../../providers/empresa/empresa";
import { Empresa } from '../../model/empresa';

@IonicPage()
@Component({
  selector: 'page-buscar-empresa',
  templateUrl: 'buscar-empresa.html',
})

export class BuscarEmpresaPage {
  empresas = Array<Empresa>();
  busca: string;
  tipo: string;
  titulo: string;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: EmpresaProvider,
    private viewCtrl: ViewController
  ) {
    this.busca = navParams.get('empresa');
    this.tipo = navParams.get('tipo');
    if("SEGURADORA" == this.tipo){
      this.titulo = 'a Seguradora';
    }else if("REPARADOR" == this.tipo){
      this.titulo = 'o Reparador';
    }else if("POSTO_COMBUSTIVEL" == this.tipo){
      this.titulo = 'o posto de Combustível';
    }
    this.get(this.busca);
  }
  getItems(ev: any) {
     let val : string = ev.target.value;
     this.get(val);
   }
   get(val){
     if (val && val.trim() != '' && val.length > 2) {
     this.provider.get(this.tipo,val)
       .then((reparadores: Array<Empresa>) => {
           this.empresas = reparadores;
       }, (error) => {
           console.log(error);
       });
     }else{
       this.empresas = null;
     }
   }
   selecionar(emp){
     this.viewCtrl.dismiss(emp);
   }
   fecharModal(){
     this.viewCtrl.dismiss();
   }
}
