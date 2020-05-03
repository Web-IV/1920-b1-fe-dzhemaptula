import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;
  title: string = 'Zound';

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
