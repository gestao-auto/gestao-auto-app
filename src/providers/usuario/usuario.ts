import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import {JwtHelper} from "angular2-jwt";

const URL_GET_USER: string = "http://localhost:8080/gestaoAuto/api/rest/usuario/";

@Injectable()
export class UsuarioProvider {
    usuarioID : string;
    jwtHelper = new JwtHelper();

  constructor(public http: HttpClient, private storage: Storage) {
    this.storage.get('token').then(
      token => {
       this.usuarioID = this.jwtHelper.decodeToken(token).sub;
      }
    );
  }

  obterUsuario() {
    this.http.get(URL_GET_USER+this.usuarioID)
    .subscribe(
      data => console.log(data),
      err => console.log(err)
    );
  }

}
