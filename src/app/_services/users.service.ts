import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User, AuthResponse } from '../_models/user.model';

const baseUrl = `${environment.apiUrl}/users`;


@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${baseUrl}/register`, user);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const authInput = { email, password };
    return this.http.post<AuthResponse>(`${baseUrl}/login`, authInput);
  }
}
