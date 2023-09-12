import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, AuthResponse } from '../_models';

const baseUrl = `${environment.apiUrl}/users`;


@Injectable({ providedIn: 'root' })
export class UsersService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
   }

   public get currentUserValue(): any {
     return this.userSubject.value;
   }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/register`, user);
  }

  getAll() {
      return this.http.get<User[]>(baseUrl);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }, { withCredentials: true })
      .pipe(
        map((response) => {
          const tokenPayload = this.parseJwt(response.token);
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(tokenPayload));
          this.userSubject.next(tokenPayload);
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
  
  private parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
