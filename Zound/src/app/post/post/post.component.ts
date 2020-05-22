import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/post';
import { UserComponent } from 'src/app/user/user/user.component';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor() {}
  @Input() post: Post;

  ngOnInit(): void {}

  avatar(size: number): string {
    const md5 = new Md5();
    var url: string =
      'https://www.gravatar.com/avatar/' +
      md5.appendStr(this.post.user.email).end() +
      '?d=identicon&s=' +
      size;
    return url;
  }
  greenText() {
    return this.post.text.startsWith('>');
  }
}
