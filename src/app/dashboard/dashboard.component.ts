import { Component } from '@angular/core';
import { UsersService, AuthService } from '../_services';
import { User } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  user: User;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
 ) { }
 ngOnInit(): void {
  this.usersService.user.subscribe((user) => {
    this.user = user;
  });
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
