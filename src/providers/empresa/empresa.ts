import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/pessoaJuridica/";

@Injectable()
export class EmpresaProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get(tipo: string, empresa: string) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + tipo +'/' + empresa)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
