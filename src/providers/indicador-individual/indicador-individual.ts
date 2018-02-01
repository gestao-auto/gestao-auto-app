import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/indicador/individual/";

@Injectable()
export class IndicadorIndividualProvider {

  constructor(public http: HttpClient) {
    console.log('Hello IndicadorIndividualProvider Provider');
  }

  getGastosComManutencao(veiculo : number, dataInicial : string, dataFinal : string) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + "manutencao/" + veiculo.toString() + "/" + dataInicial + "/" + dataFinal)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
    }

}
