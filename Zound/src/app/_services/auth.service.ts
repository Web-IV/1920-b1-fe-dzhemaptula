import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  private tokenSubject: BehaviorSubject<string>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    var userJson: any = JSON.parse(localStorage.getItem('currentUser'));
    var tokenJson: any = JSON.parse(localStorage.getItem('token'));
    this.currentUserSubject = new BehaviorSubject<User>(userJson);
    this.tokenSubject = new BehaviorSubject<string>(tokenJson);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/Account/Login`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('currentUser', JSON.stringify(user.userdto));
          this.currentUserSubject.next(user.userdto);
          this.tokenSubject.next(user.token);
          return user;
        })
      );
  }

  register(firstName, lastName, username, email, password) {
    return this.http
      .post<any>(`${environment.apiUrl}/Account/Register`, {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('currentUser', JSON.stringify(user.userdto));
          this.currentUserSubject.next(user.userdto);
          this.tokenSubject.next(user.token);
          return user;
        })
      );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): string {
    return this.tokenSubject.value;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
