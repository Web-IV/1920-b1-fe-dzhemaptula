import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { Md5 } from 'ts-md5/dist/md5';
import { FriendService } from 'src/app/_services/friend.service';
import { Observable, EMPTY } from 'rxjs';
import { UserFriendRequest } from 'src/app/_models/userfriendrequest';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public currentUser: User;

  public errorMessage: string = '';

  //friendstatus 0 is not friends, 1 request sent, 2 is friends
  @Input() user: User;
  @Input() friend: { status: number; token: string };

  constructor(
    private authService: AuthService,
    private friendService: FriendService
  ) {
    this.currentUser = authService.currentUserValue;
  }

  ngOnInit(): void {}

  avatar(size: number): string {
    const md5 = new Md5();
    var url: string =
      'https://www.gravatar.com/avatar/' +
      md5.appendStr(this.user.email).end() +
      '?d=identicon&s=' +
      size;
    console.log(this.friend.status);
    return url;
  }

  sendFriendRequest(user: User) {
    return this.friendService.sendFriendRequest(user);
  }

  cancelFriendRequest(token: string) {
    return this.friendService.cancelFriendRequest(token);
  }

  acceptFriendRequest(token: string) {
    return this.friendService.acceptFriendRequest(token);
  }
}
