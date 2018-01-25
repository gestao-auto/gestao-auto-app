import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/preferencia/";

@Injectable()
export class PreferenciasProvider {

  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get(usuario : number) {
    return new Promise((resolve, reject) => {
      this.http.get(URL + "porUsuario/" + usuario.toString())
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
  create(preferencias) {
    return new Promise((resolve, reject) => {
      this.http.post(URL, JSON.stringify(preferencias), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  update(preferencias) {
    return new Promise((resolve, reject) => {
      this.http.put(URL, JSON.stringify(preferencias), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }


}
