import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../_models/user';

import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { Observable, Subject, EMPTY } from 'rxjs';
import {
  distinctUntilChanged,
  debounceTime,
  catchError,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public filterUserName: string = '';
  public filterUser$ = new Subject<string>();
  private _fetchUsers$: Observable<User[]>;
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService,
    private route: ActivatedRoute
  ) {
    // console.log('Current user: ' + this.currentUser);
    this.filterUser$
      .pipe(distinctUntilChanged(), debounceTime(100))
      .subscribe((val) => {
        const params = val ? { queryParams: { filter: val } } : undefined;
        this.router.navigate(['/user/list'], params);
      });

    this._fetchUsers$ = this.route.queryParams
      .pipe(
        switchMap((newParams) => {
          // set the value of the input field with the url parameter as well
          if (newParams['filter']) {
            this.filterUserName = newParams['filter'];
          }

          // when the queryparameter changes, take the filter parameter and use it to ask
          // the service for all recipes with this filter in their name
          // this._recipeDataService.getRecipes$(params['filter']).subscribe(
          return this.userService.users$();
        })
      )
      .pipe(
        catchError((err) => {
          this.errorMessage = err;
          return EMPTY;
        })
      );
  }
  ngOnInit(): void {}

  applyFilter(filter: string) {
    this.filterUserName = filter;
  }

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }
}
