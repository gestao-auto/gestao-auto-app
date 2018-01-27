import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/veiculo/";

@Injectable()
export class VeiculoProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get() {
    return new Promise((resolve, reject) => {
      this.http.get(URL + 'porUsuario/1')
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}