import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL: string = `${environment.server}/users`;

  constructor(
    private http: HttpClient
  ) { }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${environment.server}/auth/register`, user);
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL);
  }

  public getOne(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }
}
