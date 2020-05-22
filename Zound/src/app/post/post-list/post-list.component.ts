import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FriendService } from 'src/app/_services/friend.service';
import { Post } from 'src/app/_models/post';
import { Observable, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { PostService } from 'src/app/_services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { title } from 'process';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  public errorMessage: string = '';
  private friendPosts: Post[];
  postForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  public currentUser: User;

  private friend: Post[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private friendService: FriendService,
    private postService: PostService
  ) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.postService.allFriendPosts$.subscribe((x) => {
      this.friendPosts = x;
    });
    this.friendService.allFriends$.subscribe((x) => {
      this.postService.allFriendPosts$.subscribe((x) => {
        this.friendPosts = x;
      });
    });
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  get posts$(): Post[] {
    return this.friendPosts;
  }

  get f() {
    return this.postForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }
    var post: Post = new Post(
      0,
      this.currentUser.userId,
      null,
      this.f.title.value,
      this.f.text.value,
      new Date()
    );
    this.loading = true;
    this.postService.addPost(post),
      (error) => {
        this.error = error;
        this.loading = false;
      };
    this.loading = false;
    this.postForm.reset();
    this.submitted = false;
    for (let name in this.postForm.controls) {
      this.postForm.controls[name].setErrors(null);
    }
  }

  keyPress(event: KeyboardEvent) {
    console.log(event.charCode);
  }
}
