import { LoginInfo } from './../interfaces/login.interface';
import { User } from './../interfaces/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL: string = `${environment.server}/auth/login`;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public getLoginInfo(): LoginInfo {
    return { token: localStorage.getItem('token'), user: this.getCurrentUser() };
  }

  public login(emailOrUserName: string, password: string): Observable<LoginInfo> {
    return this.http.post<LoginInfo>(this.baseURL, { emailOrUserName, password })
      .pipe(map((loginInfo: LoginInfo) => {
        if (loginInfo.token) {
          this.storeInfo(loginInfo);
          this.currentUserSubject.next(loginInfo.user);
        }
        return loginInfo;
      }));
  }

  private storeInfo(loginInfo: LoginInfo) {
    localStorage.setItem('token', loginInfo.token);
    localStorage.setItem('user', JSON.stringify(loginInfo.user));
  }

  private signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}
