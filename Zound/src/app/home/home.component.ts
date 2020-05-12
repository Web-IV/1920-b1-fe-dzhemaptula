import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = false;
  users: User[];
  currentUser: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthService
  ) {
    this.currentUser = authenticationService.currentUserValue;
    console.log('Current user: ' + this.currentUser.username);
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService
      .users$()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
