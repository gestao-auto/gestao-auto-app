import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { OficinaProvider } from "../../providers/oficina/oficina";
import { Reparador } from '../../model/reparador';

@IonicPage()
@Component({
  selector: 'page-buscar-oficina',
  templateUrl: 'buscar-oficina.html',
})
export class BuscarOficinaPage {
  reparadores = Array<Reparador>();
  busca: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private provider: OficinaProvider,
    private viewCtrl: ViewController
  ) {
    this.busca = navParams.get('reparador');
    this.get(this.busca);
  }

  getItems(ev: any) {
     let val : string = ev.target.value;
     this.get(val);
   }
   get(val){
     if (val && val.trim() != '' && val.length > 2) {
     this.provider.get(val)
       .then((reparadores: Array<Reparador>) => {
           this.reparadores = reparadores;
       }, (error) => {
           console.log(error);
       });
     }else{
       this.reparadores = null;
     }
   }
   selecionar(r){
     this.viewCtrl.dismiss(r);
   }
   fecharModal(){
     this.viewCtrl.dismiss();
   }
}
