import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../_models/post';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { shareReplay, tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _friendPosts$ = new BehaviorSubject<Post[]>([]);
  private _friendPosts: Post[];

  constructor(private http: HttpClient) {
    this.friendPosts$.subscribe((friendPosts: Post[]) => {
      this._friendPosts = friendPosts;
      this._friendPosts$.next(this._friendPosts);
    });
  }

  get friendPosts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/posts/friends`).pipe(
      tap(console.log),
      shareReplay(1),
      catchError(this.handleError),
      map((list: any[]): Post[] => list.map(Post.fromJSON))
    );
  }

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

  get allFriendPosts$(): Observable<Post[]> {
    return this._friendPosts$;
  }
}
