import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL: string = "http://localhost:8080/gestaoAuto/api/rest/pecaServico/";

@Injectable()
export class PecaServicoProvider {
  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  constructor(public http: HttpClient) {
  }

  get() {
    return new Promise((resolve, reject) => {
      this.http.get(URL)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject(error);
        });
      });
  }
}
