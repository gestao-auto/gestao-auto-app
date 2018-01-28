import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { Storage } from "@ionic/storage";

const URL_SIGNUP: string = "http://localhost:8080/gestaoAuto/api/seguranca/auth/";
const URL_LOGIN: string = "http://localhost:8080/gestaoAuto/api/seguranca/auth/login";

@Injectable()
export class AuthenticationProvider {

  contentHeader = new HttpHeaders({"Content-Type": "application/json"});

  jwtHelper = new JwtHelper();

  constructor(public http: HttpClient, private storage: Storage) {
  }

  login(credenciais) {
  return  this.http.post(URL_LOGIN, JSON.stringify(credenciais), { headers: this.contentHeader, responseType: 'text' as 'text' })
  }

  cadastrar(usuario) {
  return  this.http.post(URL_SIGNUP, JSON.stringify(usuario), { headers: this.contentHeader, responseType: 'text' as 'text' })
  }

  logout() {
    this.storage.remove('token');
    this.storage.remove('veiculo');
  }
}
