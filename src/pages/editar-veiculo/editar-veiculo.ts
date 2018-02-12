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
import { Mask } from '../../utils/mask/mask';

@IonicPage()
@Component({
  selector: 'page-editar-veiculo',
  templateUrl: 'editar-veiculo.html',
})
export class EditarVeiculoPage {
  marcaSelecionada: Marca;
  marcas = Array<Marca>();
  modelos = Array<Modelo>();
  veiculoEditar: Veiculo;
  jwtHelper = new JwtHelper();
  exibirDataAquisicaoPrimeiroDono: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public toastCtrl: ToastController,
    public veiculoProvider: VeiculoProvider,
    private propProvider: ProprietarioProvider,
    private mask: Mask
  ) {
    this.veiculoEditar = new Veiculo(null, null, null, null, null, null, null, null, null, null, null, false);
    this.exibirDataAquisicaoPrimeiroDono = false;
    this.storage.get('veiculoEditar').then(
      veiculo => {
        this.veiculoEditar = (veiculo == null) ? this.veiculoEditar : JSON.parse(veiculo);
        this.marcaSelecionada = this.veiculoEditar.modelo != null ? this.veiculoEditar.modelo.marca : null;
        this.exibirDataAquisicaoPrimeiroDono = this.veiculoEditar.unicoDono != null ? this.veiculoEditar.unicoDono : this.exibirDataAquisicaoPrimeiroDono;
        if (this.marcaSelecionada != null) {
          this.getModelos(this.marcaSelecionada.codigo);
        }
      });
    this.getMarcas();
    this.getProprietarioPorUsuario();
  }

  aplicarMascaraPlaca(valor, mascara) {
    this.veiculoEditar.placa = this.mask.atualizarValor(valor, mascara);
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
    if (this.veiculoEditar.codigo != undefined) {
      return this.update();
    }
    return this.save();
  }

  save() {
    this.veiculoProvider.create(this.veiculoEditar)
      .then((res) => {
        if (res) {
          this.navCtrl.setRoot('VeiculoPage');
          this.mostrarToast("Veículo salvo com sucesso!");
        }
      }, (error) => {
        this.tratarErro(error);
      });
  }

  update() {
    this.veiculoProvider.update(this.veiculoEditar, this.veiculoEditar.codigo)
      .then((res) => {
        if (res) {
          this.navCtrl.push('VeiculoPage');
          this.mostrarToast("Veículo atualizado com sucesso!");
        }
      }, (error) => {
        this.tratarErro(error);
      });
  }

  apagar() {
    this.veiculoProvider.delete(this.veiculoEditar)
      .then((veiculo: any) => {
        console.log("VeiculoPage -> apagar -> veiculo");
        this.mostrarToast('Sucesso!');
        this.navCtrl.pop();
      }, (error) => {
        this.tratarErro(error);
      });
  }

  getProprietarioPorUsuario() {
    this.storage.get('token').then(
      token => {
        this.getProprietario(this.jwtHelper.decodeToken(token).sub);
      });
  }

  getProprietario(codigoUsuario: number) {
    this.propProvider.get(codigoUsuario)
      .then((proprietario: Proprietario) => {
        if (proprietario != null) {
          this.veiculoEditar.proprietario = proprietario.codigo;
        }
      }, (error) => {
        this.tratarErro(error);
      })
  }

  compareMOD(e1: Modelo, e2: Modelo): boolean {
    return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
  }

  compareMAR(e1: Marca, e2: Marca): boolean {
    return e1 && e2 ? e1.codigo === e2.codigo : e1 === e2;
  }

  isExibirDataAquisicaoPrimeiroDono(unicoDono) {
    this.exibirDataAquisicaoPrimeiroDono = unicoDono;
  }

  mostrarToast(mensagem: string, clazz?: string) {
    let cssClass = (clazz == undefined) ? 'default' : clazz;
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      cssClass: cssClass
    });
    toast.present();
  }

  tratarErro(error) {
    (error.hasOwnProperty('error') || error.error.hasOwnProperty('message'))
      ? this.mostrarToast(error.error.message, 'danger')
      : this.mostrarToast('Ops! Não conseguimos validar suas informações. Por favor, tente novamente.', 'danger');
  }
}