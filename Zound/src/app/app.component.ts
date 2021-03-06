import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './_services/auth.service';
import { User } from './_models/user';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: User;
  title: string = 'Zound';

  constructor(
    public router: Router,
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

  routerLoginOrRegister() {
    return (
      this.router.url.match(/login.*/) || this.router.url.match(/register.*/)
    );
  }
  routerUsers() {
    return this.router.url.match(/users.*/);
  }
  routerHome() {
    return this.router.url.match(/home.*/);
  }
  routerTimeline() {
    return this.router.url.match(/timeline.*/);
  }
}
