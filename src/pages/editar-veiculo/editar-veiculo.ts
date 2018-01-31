import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProprietarioProvider } from '../../providers/proprietario/proprietario';
import { Storage } from "@ionic/storage";
import { VeiculoProvider } from "../../providers/veiculo/veiculo";
import { Proprietario } from '../../model/proprietario';
import { JwtHelper } from "angular2-jwt";
import { Veiculo } from "../../model/veiculo";
import { Modelo } from "../../model/modelo";
import { Marca } from "../../model/marca";

@IonicPage()
@Component({
  selector: 'page-editar-veiculo',
  templateUrl: 'editar-veiculo.html',
})
export class EditarVeiculoPage {
  marcaSelecionada : Marca;
  marcas = Array<Marca>();
  modelos = Array<Modelo>();
  veiculoEditar : Veiculo;
  jwtHelper = new JwtHelper();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl : ToastController,
    public veiculoProvider : VeiculoProvider,
    private propProvider: ProprietarioProvider
  ) {
    this.veiculoEditar = new Veiculo(null,null,null,null,null,null,null,null,null);
    this.storage.get('veiculoEditar').then(
      veiculo => {
        this.veiculoEditar = (veiculo == null)
          ? this.veiculoEditar
          : JSON.parse(veiculo);
          this.marcaSelecionada = this.veiculoEditar.modelo != null ? this.veiculoEditar.modelo.marca : null;
          if(this.marcaSelecionada!= null){
          this.getModelos(this.marcaSelecionada.codigo);
          }
      });
      this.getMarcas();
      this.getProprietarioPorUsuario();
  }

  getMarcas() {
    this.veiculoProvider.getMarcas()
      .then((marcas: Array<Marca>) => {
        if (marcas != null) {
          this.marcas = marcas;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  getModelos(marca) {
    this.veiculoProvider.getModelos(marca)
      .then((modelos: Array<Modelo>) => {
        if (modelos != null) {
          this.modelos = modelos;
        }
      }, (error) => {
        this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
      })
  }

  submit() {
    if (!this.valida()) {
      return this.mostrarToast("Marca e modelo são obrogatórios!");
    }
    if (this.veiculoEditar.codigo != undefined) {
        return this.update();
    }
    return this.save();
  }

  valida() : boolean {
    if (this.veiculoEditar.modelo == null) {
          return false;
      }
      return true;
  }

  save() {
    this.veiculoProvider.create(this.veiculoEditar)
      .then((res) => {
        if (res) {
          this.navCtrl.setRoot('VeiculoPage');
        }
      }, (error) => {
          this.mostrarToast("Ops! Ocorreu uma falha ao salvar suas informações. Por favor, tente novamente.");
      });
  }

  update() {
    this.veiculoProvider.update(this.veiculoEditar,this.veiculoEditar.codigo)
      .then((res) => {
        if (res) {
          this.navCtrl.push('VeiculoPage');
        }
      }, (error) => {
        this.mostrarToast("Ops! Ocorreu uma falha ao cadastrar suas informações. Por favor, tente novamente.");
      });
  }

getProprietarioPorUsuario() {
  this.storage.get('token').then(
    token => {
      this.getProprietario(this.jwtHelper.decodeToken(token).sub);
    });
}

getProprietario(codigoUsuario : number){
  this.propProvider.get(codigoUsuario)
  .then((proprietario: Proprietario) => {
      if (proprietario != null) {
        this.veiculoEditar.proprietario = proprietario.codigo;
        console.log(proprietario.codigo);
      }
    }, (error) => {
      this.mostrarToast("Ops! Não conseguimos recuperar suas informações. Por favor, tente novamente.");
    })
}

compareMOD(e1: Modelo, e2: Modelo): boolean {
  return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
}

compareMAR(e1: Marca, e2: Marca): boolean {
  return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
}

  mostrarToast(mensagem : string) {
    let toast = this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'top'
      });
    toast.present();
  }
}
