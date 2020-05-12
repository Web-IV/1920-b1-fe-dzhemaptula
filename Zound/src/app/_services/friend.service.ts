import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { shareReplay, catchError, tap, map } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserFriendRequest } from '../_models/userfriendrequest';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {
    this.receivedRequests$.subscribe((requests: UserFriendRequest[]) => {
      this._friendRequestsReceived = requests;
      this._friendRequestsReceived$.next(this._friendRequestsReceived);
    });

    this.sentRequests$.subscribe((requests: UserFriendRequest[]) => {
      this._friendRequestsSent = requests;
      this._friendRequestsSent$.next(this._friendRequestsSent);
    });
  }

  private _friendRequestsSent$ = new BehaviorSubject<UserFriendRequest[]>([]);
  private _friendRequestsReceived$ = new BehaviorSubject<UserFriendRequest[]>(
    []
  );

  private _friendRequestsSent: UserFriendRequest[];
  private _friendRequestsReceived: UserFriendRequest[];

  sendFriendRequest(user: User) {
    console.log(`${environment.apiUrl}/friend/add`);
    this.http
      .post(`${environment.apiUrl}/friend/add`, User.toJSON(user))
      .pipe(catchError(this.handleError))
      .subscribe();
  }

  get sentRequests$(): Observable<UserFriendRequest[]> {
    console.log(`${environment.apiUrl}/friend/requests/received`);
    return this.http.get(`${environment.apiUrl}/friend/requests/sent`).pipe(
      catchError(this.handleError),
      map((list: any[]): UserFriendRequest[] =>
        list.map(UserFriendRequest.fromJSON)
      )
    );
  }

  get receivedRequests$(): Observable<UserFriendRequest[]> {
    console.log(`${environment.apiUrl}/friend/requests/received`);
    return this.http.get(`${environment.apiUrl}/friend/requests/received`).pipe(
      catchError(this.handleError),
      map((list: any[]): UserFriendRequest[] =>
        list.map(UserFriendRequest.fromJSON)
      )
    );
  }

  acceptFriendRequest(token: string) {}

  declineFriendRequest(token: string) {}

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
}
