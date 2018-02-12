import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators/mergeMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storage: Storage) { }

  getToken(): Promise<any> {
     return this.storage.get('token');
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     return fromPromise(this.getToken()).pipe(
          mergeMap(token => {
              req = req.clone({
                 setHeaders: {
                     Authorization: `Bearer ${token}`
                 }
             });
             return next.handle(req);
         }));
   }
 }
