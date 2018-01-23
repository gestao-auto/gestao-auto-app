import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/proprietario/";

@Injectable()
export class ProprietarioProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient, private storage : Storage) {
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

  create(proprietario) {
    return new Promise((resolve, reject) => {
      this.http.post(URL, JSON.stringify(proprietario), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }

  update(proprietario) {
    return new Promise((resolve, reject) => {
      this.http.put(URL, JSON.stringify(proprietario), {headers: this.contentHeader})
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}