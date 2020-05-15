import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { shareReplay, catchError, tap, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserFriendRequest } from '../_models/userfriendrequest';
import { UserFriend } from '../_models/userfriend';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  private _sentRequests$ = new BehaviorSubject<UserFriendRequest[]>([]);
  private _sentRequests: UserFriendRequest[];

  private _receivedRequests$ = new BehaviorSubject<UserFriendRequest[]>([]);
  private _receivedRequests: UserFriendRequest[];

  private _userFriends$ = new BehaviorSubject<UserFriend[]>([]);
  private _userFriends: UserFriend[];

  constructor(private http: HttpClient) {
    // this.receivedRequests$.subscribe((requests: UserFriendRequest[]) => {
    //   this._friendRequestsReceived = requests;
    //   this._friendRequestsReceived$.next(this._friendRequestsReceived);
    // });
    // this.sentRequests$.subscribe((requests: UserFriendRequest[]) => {
    //   this._friendRequestsSent = requests;
    //   this._friendRequestsSent$.next(this._friendRequestsSent);
    // });

    this.sentRequests$.subscribe((sentRequests: UserFriendRequest[]) => {
      this._sentRequests = sentRequests;
      this._sentRequests$.next(this._sentRequests);
    });

    this.receivedRequests$.subscribe(
      (receivedRequests: UserFriendRequest[]) => {
        this._receivedRequests = receivedRequests;
        this._receivedRequests$.next(this._receivedRequests);
      }
    );

    this.friends$.subscribe((userFriends: UserFriend[]) => {
      this._userFriends = userFriends;
      this._userFriends$.next(this._userFriends);
    });
  }

  // private _friendRequestsSent$ = new BehaviorSubject<UserFriendRequest[]>([]);
  // private _friendRequestsReceived$ = new BehaviorSubject<UserFriendRequest[]>(
  //   []
  // );

  // private _friendRequestsSent: UserFriendRequest[];
  // private _friendRequestsReceived: UserFriendRequest[];

  sendFriendRequest(user: User) {
    // console.log(`${environment.apiUrl}/friend/add`);
    return this.http
      .post(`${environment.apiUrl}/friend/add`, User.toJSON(user))
      .pipe(
        catchError(this.handleError),
        map(UserFriendRequest.fromJSON),
        tap((request: UserFriendRequest) => {
          this._sentRequests = [...this._sentRequests, request];
          this._sentRequests$.next(this._sentRequests);
        })
      )
      .subscribe();
  }

  cancelFriendRequest(token: string) {
    return this.http
      .delete(`${environment.apiUrl}/friend/decline/${token}`)
      .pipe(
        catchError(this.handleError),
        map(UserFriendRequest.fromJSON),
        tap((request: UserFriendRequest) => {
          this._sentRequests = this.filterSentRequestOut(request);
          this._sentRequests$.next(this._sentRequests);
        })
      )
      .subscribe();
  }

  acceptFriendRequest(token: string) {
    return this.http
      .get(`${environment.apiUrl}/friend/accept/${token}`)
      .pipe(
        catchError(this.handleError),
        map(UserFriend.fromJSON),
        tap((request: UserFriend) => {
          this._userFriends = [...this._userFriends, request];
          this._userFriends$.next(this._userFriends);
        })
      )
      .subscribe();
  }

  // get sentRequests$(): Observable<UserFriendRequest[]> {
  //   console.log(`${environment.apiUrl}/friend/requests/sent`);
  //   return this.http.get(`${environment.apiUrl}/friend/requests/sent`).pipe(
  //     catchError(this.handleError),
  //     map((list: any[]): UserFriendRequest[] =>
  //       list.map(UserFriendRequest.fromJSON)
  //     )
  //   );
  // }

  get sentRequests$(): Observable<UserFriendRequest[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/friend/requests/sent`)
      .pipe(
        // tap(console.log),
        map((list: UserFriendRequest[]): UserFriendRequest[] =>
          list.map(UserFriendRequest.fromJSON)
        )
      );
  }

  get receivedRequests$(): Observable<UserFriendRequest[]> {
    return this.http
      .get<any>(`${environment.apiUrl}/friend/requests/received`)
      .pipe(
        // tap(console.log),
        map((list: UserFriendRequest[]): UserFriendRequest[] =>
          list.map(UserFriendRequest.fromJSON)
        )
      );
  }

  get friends$(): Observable<UserFriend[]> {
    return this.http.get<any>(`${environment.apiUrl}/friend/all`).pipe(
      // tap(console.log),
      map((list: UserFriend[]): UserFriend[] => list.map(UserFriend.fromJSON))
    );
  }

  // friendsOfUser$(user: User): Observable<UserFriend[]> {
  //   return this.http
  //     .get<any>(`${environment.apiUrl}/users/id/${user.userId}/friends`)
  //     .pipe(
  //       tap(console.log),
  //       map((list: UserFriend[]): UserFriend[] => list.map(UserFriend.fromJSON))
  //     );
  // }

  // get allFriends$(): Observable<UserFriend[]> {
  //   return this._userFriends$;
  // }

  get allSentRequests$(): Observable<UserFriendRequest[]> {
    return this._sentRequests$;
  }

  get allReceivedRequests$(): Observable<UserFriendRequest[]> {
    return this._receivedRequests$;
  }

  get allFriends$(): Observable<UserFriend[]> {
    return this._userFriends$;
  }

  // get receivedRequests$(): Observable<UserFriendRequest[]> {
  //   console.log(`${environment.apiUrl}/friend/requests/received`);
  //   return this.http.get(`${environment.apiUrl}/friend/requests/received`).pipe(
  //     catchError(this.handleError),
  //     map((list: any[]): UserFriendRequest[] =>
  //       list.map(UserFriendRequest.fromJSON)
  //     )
  //   );
  // }

  handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else if (err instanceof HttpErrorResponse) {
      console.log(err);
      errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
    } else {
      errorMessage = err;
    }
    return throwError(errorMessage);
  }

  filterSentRequestOut(requestToFilterOut: UserFriendRequest) {
    return this._sentRequests.filter((ele) => {
      return ele.token != requestToFilterOut.token;
    });
  }
}
