import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string;

  constructor(private storage: Storage){
    storage.ready().then(() => {
      storage.get('token').then(token => {
        this.token = token;
      }).catch(console.log);
    });

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` }
      });
      return next.handle(authReq);
    }



}
