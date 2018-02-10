import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/pessoaJuridica/reparador/";

@Injectable()
export class OficinaProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get(oficina: string) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + oficina)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

}
