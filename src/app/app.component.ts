import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UsersService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'veegil';
  user: any;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
    ) {}

    ngOnInit(): void {
      // Retrieve user data from local storage
      const userJson = localStorage.getItem('user');
      this.user = userJson ? JSON.parse(userJson) : null;
    }

    home() {
      this.router.navigate(['/dashboard']);
    }

    deposit() {
      this.router.navigate(['/deposit']);
    }
  
    withdraw() {
      this.router.navigate(['/withdraw']);
    }
  
    profile() {
      this.router.navigate(['/profile']);
    }
  
    logout() {
      this.usersService.logout();
      this.router.navigate(['/login']);
    }
}