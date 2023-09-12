import { Injectable } from '@angular/core';
import { User, AuthResponse } from '../_models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
      
    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        const userJson = localStorage.getItem('user');
        return !!token && !!userJson;
      }
}
