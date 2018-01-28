import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/home/";

@Injectable()
export class HomeProvider {

  constructor(public http: HttpClient) {
  }

  getManutencao(veiculo : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + "manutencao/" + veiculo)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
    }
}
