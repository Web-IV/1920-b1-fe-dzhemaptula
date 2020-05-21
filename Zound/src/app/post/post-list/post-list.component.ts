import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendService } from 'src/app/_services/friend.service';
import { Post } from 'src/app/_models/post';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PostService } from 'src/app/_services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public errorMessage: string = '';
  private friendPosts: Post[];

  private friend: Post[];

  constructor(
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private friendService: FriendService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postService.allFriendPosts$.subscribe((x) => {
      this.friendPosts = x;
    });
    this.friendService.allFriends$.subscribe((x) => {});
    //TODO FIX
  }

  get posts$(): Post[] {
    return this.friendPosts;
  }
}
