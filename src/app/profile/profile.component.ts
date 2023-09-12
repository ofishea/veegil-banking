import { Component } from '@angular/core';
import { UsersService } from '../_services';
import { User } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User;

  constructor(
    private usersService: UsersService,
    private router: Router
 ) { }
 ngOnInit(): void {
  this.usersService.user.subscribe((user) => {
    this.user = user;
  });
}

  logout() {
    this.usersService.logout();
    this.router.navigate(['/login']);
  }
}