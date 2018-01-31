import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL_VEICULO: string = "http://localhost:8080/gestaoAuto/api/rest/veiculo/";
const URL_MODELO: string = "http://localhost:8080/gestaoAuto/api/rest/veiculo/modelo/";
const URL_MARCA: string = "http://localhost:8080/gestaoAuto/api/rest/veiculo/marca/";

@Injectable()
export class VeiculoProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get(veiculo: number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL_VEICULO + veiculo.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getByUser(usuario: number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL_VEICULO + 'porUsuario/'+ usuario.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  create(veiculo) {
    return new Promise((resolve, reject) => {
      this.http.post(URL_VEICULO, JSON.stringify(veiculo), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  updateOdometro(veiculo : number, odometro : number) {
    return new Promise((resolve, reject) => {
      this.http.put(URL_VEICULO + veiculo.toString() + "/odometro/"+ odometro.toString(), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  update(veiculo, codVeiculo: number) {
    return new Promise((resolve, reject) => {
      this.http.put(URL_VEICULO+codVeiculo.toString(), JSON.stringify(veiculo), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  delete(veiculo) {
    return new Promise((resolve, reject) => {
      this.http.put(URL_VEICULO + veiculo.codigo.toString(), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getMarcas() {
    return new Promise((resolve, reject) => {
      this.http.get(URL_MARCA)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getModelos(marca : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL_MODELO +"marca/" + marca.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
