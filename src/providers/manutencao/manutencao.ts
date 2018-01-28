import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/manutencao/";

@Injectable()
export class ManutencaoProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient, private storage : Storage) {
  }

  get(manutencao : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + manutencao.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getByVehicle(veiculo : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + "porVeiculo/" + veiculo.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  create(manutencao) {
    return new Promise((resolve, reject) => {
      this.http.post(URL, JSON.stringify(manutencao), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  update(manutencao) {
    return new Promise((resolve, reject) => {
      this.http.put(URL, JSON.stringify(manutencao), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  delete(manutencao) {
    return new Promise((resolve, reject) => {
      this.http.put(URL + manutencao.codigo.toString(), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  deleteItem(itemManutencao) {
    return new Promise((resolve, reject) => {
      this.http.delete(URL + 'item/' + itemManutencao.codigo.toString(), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  getNextReviewByVehicle(veiculo : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + "proxima/" + veiculo.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
