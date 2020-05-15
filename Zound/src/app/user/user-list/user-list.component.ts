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
  tap,
} from 'rxjs/operators';
import { UserFriendRequest } from 'src/app/_models/userfriendrequest';
import { FriendService } from 'src/app/_services/friend.service';
import { UserFriend } from 'src/app/_models/userfriend';

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

  private sentRequests: UserFriendRequest[];
  private receivedRequests: UserFriendRequest[];
  private userFriends: UserFriend[];

  private currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private friendService: FriendService
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

    this.currentUser = authenticationService.currentUserValue;
  }
  ngOnInit(): void {
    this.friendService.allSentRequests$.subscribe((x) => {
      // console.log(x);
      this.sentRequests = x;
    });
    this.friendService.allReceivedRequests$.subscribe((x) => {
      console.log(x);
      this.receivedRequests = x;
    });
    this.friendService.allFriends$.subscribe((x) => {
      console.log(x);
      this.userFriends = x;
    });
  }

  applyFilter(filter: string) {
    this.filterUserName = filter;
  }

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }

  // props(user: User): any {
  //   return { user: user, friendStatus: this.friendRequestSent(user) };
  // }

  friendRequestSent(user: User): { status: number; token: string } {
    var res: any = { status: 0, token: '' };
    var found: boolean = false;
    if (user.userId == this.currentUser.userId) {
      return { status: -1, token: '' };
      found = true;
    }
    if (!found) {
      this.sentRequests.forEach((element) => {
        if (element.requestedToId == user.userId) {
          res = { status: 1, token: element.token };
          found = true;
        }
      });
      if (!found) {
        this.receivedRequests.forEach((element) => {
          if (element.requestedFromId == user.userId) {
            res = { status: 2, token: element.token };
            found = true;
          }
        });
        if (!found) {
          this.userFriends.forEach((element) => {
            if (element.friendId == user.userId) {
              res = { status: 3, token: '' };
            }
          });
        }
      }
    }

    return res;
  }
}
