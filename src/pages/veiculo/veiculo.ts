import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Veiculo } from '../../model/veiculo';
import { Modelo } from '../../model/modelo';

/**
 * Generated class for the VeiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-veiculo',
  templateUrl: 'veiculo.html',
})
export class VeiculoPage {
  listaFake = Array<any>();
  modelo : Modelo;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.modelo = new Modelo(null,'Palio 1.0',null,2001);
    this.listaFake = [
      new Veiculo(null,'Palio Prata',this.modelo,'ABC-1234',2000,'Carro','123456789',75000),
      new Veiculo(null,'Palio Vermelho',this.modelo,'CBA-3241',2001,'Carro','987654321',60000),
    ];
  }
}
