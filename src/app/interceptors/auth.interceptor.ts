import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LoginInfo } from '../interfaces/login.interface';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentLoginInfo: LoginInfo = this.loginService.getLoginInfo();
    if (currentLoginInfo.token && currentLoginInfo.user) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentLoginInfo.token}`
        }
      });
    }

    return next.handle(request);
  }
}
