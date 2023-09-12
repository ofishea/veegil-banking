import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'veegil';
  user: any;

  constructor(
    private authService: AuthService
    ) {}

    ngOnInit(): void {
      // Retrieve user data from local storage
      const userJson = localStorage.getItem('user');
      this.user = userJson ? JSON.parse(userJson) : null;
    }
}