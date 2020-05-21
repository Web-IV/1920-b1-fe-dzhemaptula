import { User } from './user';

export interface PostJson {
  postId: number;
  userDto: User;
  title: string;
  text: string;
  datePosted: Date;
}

export class Post {
  constructor(
    private _postId: number,
    private _user: User,
    private _title: string,
    private _text: string,
    private _datePosted: Date
  ) {}

  static fromJSON(json: PostJson): Post {
    var user = User.fromJSON(json.userDto);
    const post = new Post(
      json.postId,
      user,
      json.title,
      json.text,
      json.datePosted
    );
    return post;
  }

  static toJSON(post: Post): Object {
    var jsonData = {
      postId: post._postId,
      user: User.toJSON(post._user),
      title: post._title,
      text: post._text,
      datePosted: post._datePosted,
    };
    console.log(jsonData);
    return jsonData;
  }

  get text(): string {
    return this._text;
  }

  get title(): string {
    return this._title;
  }

  get user(): User {
    return this._user;
  }

  get postId(): number {
    return this._postId;
  }

  get datePosted(): Date {
    return this._datePosted;
  }
}
